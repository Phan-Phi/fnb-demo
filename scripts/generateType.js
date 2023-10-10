const fs = require("node:fs");
const axios = require("axios").default;
const path = require("node:path");
const t = require("@babel/types");
const { parse } = require("@babel/parser");
const _traverse = require("@babel/traverse");
const _generator = require("@babel/generator");

const { exec } = require("node:child_process");

const SOURCE_PATH = path.resolve(process.cwd(), "ReadMe.md");
const GENERATED_DIR = path.resolve(process.cwd(), "__generated__");
const END_POINT_DEST = path.resolve(process.cwd(), "__generated__", "END_POINT.ts");
const INDEX_DEST = path.resolve(process.cwd(), "__generated__", "index.ts");

const HOST_NAME = "https://demo-fnb.t-solution.vn";

const endPointStream = fs.createWriteStream(END_POINT_DEST);
const indexStream = fs.createWriteStream(INDEX_DEST);

const traverse = _traverse.default;
const generator = _generator.default;

const generateExpressionTypeNode = (expression) => {
  let _expression = expression;

  if (typeof _expression !== "string") {
    _expression = JSON.stringify(_expression);
  }

  const TEMPLATE = `type TEMPLATE = ${_expression}`;

  const ast = parse(TEMPLATE, { sourceType: "module", plugins: ["typescript"] });

  const item = ast.program.body[0].typeAnnotation;

  return item;
};

if (!fs.existsSync(GENERATED_DIR)) {
  fs.mkdirSync(GENERATED_DIR, {
    recursive: true,
  });
}

fs.readFile(SOURCE_PATH, "utf8", async (err, content) => {
  if (err) throw err;

  const PAGE_TYPES = {};

  //* CREATE END POINT
  {
    const regex = /(?<=(GET|POST|PUT|PATCH|DELETE) )(\/.*\/)/g;

    const results = content.matchAll(regex);

    let pathList = new Map();

    for (const result of results) {
      const key = result[2]
        .replace("/api/v2", "")
        .replace("${id}", "with/id")
        .split("/")
        .filter((el) => el !== "")
        .map((el) => el.toUpperCase())
        .join("_")
        .concat("_END_POINT");

      pathList.set(key, result[2]);
    }

    for (const [key, value] of pathList.entries()) {
      endPointStream.write(`export const ${key} = ${JSON.stringify(value)};\n\n`);
    }
  }

  //* FIND & CREATE PAGE TYPES
  {
    const regex = /(?<=- )`((.*?)\.(.*?))`/g;

    const results = content.matchAll(regex);

    for await (const result of results) {
      PAGE_TYPES[result[1].toUpperCase().replaceAll(".", "_")] = result[1];
    }

    endPointStream.write(`export const PAGE_TYPES = ${JSON.stringify(PAGE_TYPES)};\n\n`);
    endPointStream.end();

    exec(`npx prettier ${END_POINT_DEST} --write`);
  }

  //* GENERATE RESPONSE TYPE

  {
    const regex = /(?<=(GET|POST|PUT|PATCH|DELETE) )(\/.*\/)/g;
    const results = content.matchAll(regex);

    let count = 0;

    const resultList = [...results];

    const exportFileList = [];

    exportFileList.push(END_POINT_DEST);

    const waitList = [];

    for (const result of resultList) {
      count++;
      const method = result[1];
      const pathname = result[2];

      let SNAKE_CASE_NAME = result[2]
        .replace("/api/v2", "")
        .split("/")
        .filter((el) => el !== "")
        .map((el) => el.toUpperCase())
        .join("_");

      if (method !== "GET") continue;

      if (pathname.includes("${id}")) continue;

      const URL = `${HOST_NAME}${pathname}?fields=*&format=json&limit=50`;

      waitList.push(
        axios.get(URL).then(({ data }) => {
          return new Promise((resolve) => {
            mutateData({ data, name: SNAKE_CASE_NAME }, (err, data) => {
              if (err) throw err;

              const pathname = path.resolve(
                process.cwd(),
                "__generated__",
                `${(SNAKE_CASE_NAME || "SETTING").concat("_TYPE")}.ts`
              );

              exportFileList.push(pathname);

              fs.writeFile(pathname, data, (err) => {
                resolve();
              });
            });
          });
        })
      );

      if ("/api/v2/pages/" === pathname) {
        Object.values(PAGE_TYPES).forEach((el) => {
          const URL = `${HOST_NAME}${pathname}?type=${el}&fields=*&limit=50`;
          const TYPE_NAME = el
            .split(".")[1]
            .split(/(?=[A-Z])/)
            .map((el) => el.toUpperCase())
            .join("_")
            .concat("_TYPE");

          waitList.push(
            axios.get(URL).then(({ data }) => {
              return new Promise((resolve) => {
                mutateData({ data, name: TYPE_NAME }, (err, data) => {
                  if (err) throw err;

                  const pathname = path.resolve(
                    process.cwd(),
                    "__generated__",
                    `${TYPE_NAME}.ts`
                  );

                  exportFileList.push(pathname);

                  fs.writeFile(pathname, data, (err) => {
                    resolve();
                  });
                });
              });
            })
          );
        });
      }
    }

    await Promise.all(waitList).then(() => {
      exportFileList.forEach((el) => {
        const result = path.relative(GENERATED_DIR, el);

        const code = generator(
          parse(`export * from "./${result}"`, {
            sourceType: "module",
          })
        ).code;

        indexStream.write(`${code}\n`);
      });
    });
  }
});

function mutateData({ data, name }, cb) {
  exec(
    `echo '${JSON.stringify(
      data
    )}' | npx quicktype --lang ts --just-types --no-date-times --prefer-unions`,
    (err, stdout) => {
      const ast = parse(stdout, {
        sourceType: "module",
        plugins: ["typescript"],
      });

      traverse(ast, {
        ExportNamedDeclaration(path) {
          const id = path.node.declaration.id;

          if (t.isTSTypeAliasDeclaration(path.node.declaration)) {
            if (path.node.declaration.id.name === "Locale") {
              path.node.declaration.typeAnnotation =
                generateExpressionTypeNode(`"vi" | "en"`);
            }
          }

          if (t.isTSInterfaceDeclaration(path.node.declaration)) {
            for (const node of path.node.declaration.body.body) {
              if (["previous", "next"].includes(node.key.name)) {
                node.typeAnnotation.typeAnnotation =
                  generateExpressionTypeNode(`string | null`);

                continue;
              }

              if (t.isTSNullKeyword(node.typeAnnotation.typeAnnotation)) {
                node.typeAnnotation.typeAnnotation =
                  generateExpressionTypeNode(`string | null`);
              }
            }
          }

          if (!["Item", "TopLevel"].includes(id.name)) {
            path.replaceWith(path.node.declaration);
          }

          const isItem = t.isIdentifier(id, {
            name: "Item",
          });

          if (isItem) {
            id.name = name.concat("_ITEM_TYPE");
          }

          const isTopLevel = t.isIdentifier(id, {
            name: "TopLevel",
          });

          if (isTopLevel) {
            id.name = name || "DEFAULT_NAME_TYPE";

            if (t.isTSInterfaceDeclaration(path.node.declaration)) {
              const interfaceBody = path.node.declaration.body.body;

              for (const el of interfaceBody) {
                if (el.key.name === "items") {
                  if (!t.isTSAnyKeyword(el.typeAnnotation.typeAnnotation.elementType)) {
                    el.typeAnnotation.typeAnnotation = generateExpressionTypeNode(
                      `${name.concat("_ITEM_TYPE")}[]`
                    );
                  }
                }
              }
            }
          }
        },
      });

      cb(null, generator(ast).code);
    }
  );
}

// quicktype [--lang LANG] [--src-lang SRC_LANG] [--out FILE] FILE|URL ...

// LANG ... cs|go|rs|cr|cjson|c++|objc|java|ts|js|javascript-prop-
//   types|flow|swift|scala3|Smithy|kotlin|elm|schema|ruby|dart|py|pike|haskell|typescript-
//   zod|typescript-effect-schema|php

//   SRC_LANG ... json|schema|graphql|postman|typescript

// Options

//  -o, --out FILE                                              The output file. Determines --lang and --top-level.
//  -t, --top-level NAME                                        The name for the top level type.
//  -l, --lang LANG                                             The target language.
//  -s, --src-lang SRC_LANG                                     The source language (default is json).
//  --src FILE|URL|DIRECTORY                                    The file, url, or data directory to type.
//  --src-urls FILE                                             Tracery grammar describing URLs to crawl.
//  --no-maps                                                   Don't infer maps, always use classes.
//  --no-enums                                                  Don't infer enums, always use strings.
//  --no-uuids                                                  Don't convert UUIDs to UUID objects.
//  --no-date-times                                             Don't infer dates or times.
//  --no-integer-strings                                        Don't convert stringified integers to integers.
//  --no-boolean-strings                                        Don't convert stringified booleans to booleans.
//  --no-combine-classes                                        Don't combine similar classes.
//  --no-ignore-json-refs                                       Treat $ref as a reference in JSON.
//  --graphql-schema FILE                                       GraphQL introspection file.
//  --graphql-introspect URL                                    Introspect GraphQL schema from a server.
//  --http-method METHOD                                        HTTP method to use for the GraphQL introspection query.
//  --http-header HEADER                                        Header(s) to attach to all HTTP requests, including the
//                                                              GraphQL introspection query.
//  -S, --additional-schema FILE                                Register the $id's of additional JSON Schema files.
//  --alphabetize-properties                                    Alphabetize order of class properties.
//  --all-properties-optional                                   Make all class properties optional.
//  --quiet                                                     Don't show issues in the generated code.
//  --debug OPTIONS or all                                      Comma separated debug options: print-graph, print-
//                                                              reconstitution, print-gather-names, print-transformations,
//                                                              print-schema-resolving, print-times, provenance
//  --telemetry enable|disable                                  Enable anonymous telemetry to help improve quicktype
//  -h, --help                                                  Get some help.
//  -v, --version

// Options for TypeScript

//  --[no-]just-types                                           Interfaces only (off by default)
//  --[no-]nice-property-names                                  Transform property names to be JavaScripty (off by
//                                                              default)
//  --[no-]explicit-unions                                      Explicitly name unions (off by default)
//  --[no-]runtime-typecheck                                    Verify JSON.parse results at runtime (on by default)
//  --[no-]runtime-typecheck-ignore-unknown-properties          Ignore unknown properties when verifying at runtime (off
//                                                              by default)
//  --acronym-style original|pascal|camel|lowerCase             Acronym naming style
//  --converters top-level|all-objects                          Which converters to generate (top-level by default)
//  --raw-type json|any                                         Type of raw input (json by default)
//  --[no-]prefer-unions                                        Use union type instead of enum (off by default)
//  --[no-]prefer-types
