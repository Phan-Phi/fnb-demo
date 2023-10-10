import { get } from "lodash";

const getSeoObject = (props: any) => {
  const title = get(props, "seo_title");
  const description = get(props, "search_description");
  const image = get(props, "og_image");
  const locale = get(props, "locale");

  return {
    title,
    description,
    image,
    locale,
  };
};

export { getSeoObject };
