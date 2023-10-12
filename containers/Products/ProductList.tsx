import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useUpdateEffect } from "react-use";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { get, isEmpty } from "lodash";
import { Box, Container, Grid, Grow, Stack, styled } from "@mui/material";

import {
  SEO,
  Banner,
  Spacing,
  NoProducts,
  Pagination,
  LoadingProducts,
} from "@/components";
import Sort from "./components/Sort";
import Categories from "./components/Categories";
import { CardProductItem } from "@/compositions";
import BreadcrumbsProduct from "./components/BreadcrumbsProduct";

import {
  useCart,
  useIntl,
  useFetch,
  useParams,
  useGetParent,
  useFindCategory,
} from "@/hooks";
import { IPage } from "@/interfaces";
import { URL_DEFAULT_IMAGE } from "@/constants";
import { getSeoObject, transformUrl } from "@/libs";

import {
  HOME_PAGE_TYPE,
  PRODUCT_PAGE_TYPE_ITEM_TYPE,
  PRODUCT_CATEGORY_LISTING_PAGE_TYPE,
} from "@/__generated__";
import { PAGES_END_POINT, PAGE_TYPES } from "@/__generated__/END_POINT";

const ExportSection = dynamic(import("@/compositions/ExportSection/ExportSection"), {
  ssr: false,
});

export type ProductListProps = IPage<
  [PRODUCT_CATEGORY_LISTING_PAGE_TYPE, HOME_PAGE_TYPE]
>;

export default function ProductList(props: ProductListProps) {
  const { messages } = useIntl();
  const meta = get(props, "initData[0].items[0].meta");
  const homeData = get(props, "initData[1].items[0]");

  const { export_cta, local_cta, local_image, export_image } = homeData;

  const exportSectionData = {
    export_cta,
    local_cta,
    local_image,
    export_image,
  };

  const router = useRouter();
  const { isExported, setIsExported } = useCart();
  const { parentData } = useGetParent();
  const parentId = get(parentData, "id") as string;
  const { categoryData } = useFindCategory(parentId);

  const arr: any = [
    {
      title: messages["product"],
      href: "/category",
    },
    ...categoryData,
  ];

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { params, setParams } = useParams({
    initState: {
      limit: 10,
      offset: 0,
      fields: "*",
      locale: router.locale,
      type: PAGE_TYPES["PRODUCT_PRODUCTPAGE"],
      descendant_of: parentId,
      is_exported: isExported ? true : "false",
    },
    omitQuery: {
      id: undefined,
    },
    excludeKeys: [
      "type",
      "locale",
      "fields",
      "limit",
      "offset",
      "is_exported",
      "descendant_of",
      "order",
    ],
  });

  const {
    data: dataProduct,
    resData,
    changeKey,
    isLoading,
  } = useFetch<PRODUCT_PAGE_TYPE_ITEM_TYPE>(transformUrl(PAGES_END_POINT, params));

  useEffect(() => {
    if (resData == undefined) return;

    const totalCount = resData.meta.total_count;
    setTotalPage(Math.ceil(totalCount / 10));

    // if (isMdDown) {
    //   setTotalPage(Math.ceil(totalCount / 6));
    //   setParams({
    //     limit: 6,
    //   });
    // } else {
    //   setTotalPage(Math.ceil(totalCount / 8));
    //   setParams({
    //     limit: 8,
    //   });
    // }
  }, [resData]);

  useUpdateEffect(() => {
    if (parentId) {
      setParams({
        offset: 0,
        descendant_of: parentId,
      });
    }

    setCurrentPage(1);
  }, [parentId]);

  useUpdateEffect(() => {
    changeKey(transformUrl(PAGES_END_POINT, params));
  }, [params]);

  const renderProducts = useMemo(() => {
    const LoadingComponent = <LoadingProducts />;

    let content: React.ReactNode = null;

    if (dataProduct == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(dataProduct) && !isLoading) {
      content = <NoProducts />;
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Grid container rowSpacing="20px" columnSpacing="16px">
            {dataProduct.map((item, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <Grow in={true} timeout={index * 70 + 600}>
                    <Box>
                      <CardProductItem
                        title={item.title}
                        alt={item.title}
                        imageSrc={item.images[0].value || ""}
                        price={item.first_variant_price}
                        isExported={item.is_exported}
                        id={item.id}
                      />
                    </Box>
                  </Grow>
                </Grid>
              );
            })}
          </Grid>
        );
      }
    }

    return content;
  }, [dataProduct, isLoading]);

  const handleChangeExported = useCallback(() => {
    if (isExported) {
      setIsExported(false);
      setParams({
        is_exported: "false",
        order: undefined,
        offset: 0,
      });
    } else {
      setIsExported(true);
      setParams({
        is_exported: true,
        order: undefined,
        offset: 0,
      });
    }
    setCurrentPage(1);
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isExported]);

  const handlePagination = useCallback(
    (event: React.SyntheticEvent, page: number) => {
      setCurrentPage(page);

      if (currentPage === page) return;

      setParams({
        offset: (page - 1) * params.limit,
      });
    },
    [params, currentPage]
  );

  if (parentData == undefined || homeData == undefined) return null;

  return (
    <Container>
      <Stack gap="16px">
        <SEO {...getSeoObject(meta)} />

        <StyledWrapperBreadcrumbs>
          <BreadcrumbsProduct arrayBreadcrumbs={arr} />
        </StyledWrapperBreadcrumbs>

        <Banner
          imgSrc={parentData.banner || URL_DEFAULT_IMAGE}
          title={parentData.title}
        />

        <Grid container spacing="24px">
          <Grid item xs={2}>
            <Categories />
          </Grid>
          <Grid item xs={10}>
            <Stack gap="16px">
              <StyledWrapperSort isExported={isExported}>
                <Sort setParams={setParams} />
              </StyledWrapperSort>

              {renderProducts}

              <StyledWrapperPagination
                isDataEmpty={isEmpty(dataProduct)}
                isLoading={!isLoading}
              >
                <Pagination
                  page={currentPage}
                  count={totalPage}
                  onchange={handlePagination}
                />
              </StyledWrapperPagination>
            </Stack>
          </Grid>
        </Grid>

        <Spacing spacing={2.5} />

        <ExportSection data={exportSectionData} callback={handleChangeExported} />
      </Stack>
    </Container>
  );
}

const StyledWrapperBreadcrumbs = styled(Box)(() => {
  return {
    padding: "0 16px",
  };
});

const StyledWrapperPagination = styled(Box, {
  shouldForwardProp: (propName) => propName !== "isDataEmpty" && propName !== "isLoading",
})<{ isDataEmpty: boolean; isLoading: boolean }>(({ isDataEmpty, isLoading }) => {
  if (isDataEmpty && isLoading) {
    return {
      display: "none",
    };
  } else {
    return {
      display: "block",
    };
  }
});

const StyledWrapperSort = styled(Stack, {
  shouldForwardProp: (propName) => propName !== "isExported",
})<{ isExported: boolean }>(({ isExported }) => {
  return {
    alignItems: "flex-end",
    display: isExported ? "none" : "flex",
  };
});
