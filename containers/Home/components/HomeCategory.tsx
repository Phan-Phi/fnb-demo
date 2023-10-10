import { useMemo } from "react";
import { Container, Grid, styled } from "@mui/material";

import { CardCategoryItem } from "@/compositions";
import { URL_DEFAULT_IMAGE } from "@/constants";
import { PRODUCT_CATEGORY_DETAIL_PAGE_TYPE_ITEM_TYPE } from "@/__generated__";
import { useCheckCategory } from "@/hooks";

export default function HomeCategory() {
  const { data: dataCategory, isLoading } = useCheckCategory();

  const render = useMemo(() => {
    if (dataCategory == undefined) return null;
    const data = dataCategory.filter((el: any) => el.products.length > 0);

    return data.map((el, idx) => {
      return (
        <Grid item xs={4} key={idx}>
          <CardCategoryItem
            isHomePage
            imageSrc={el.banner || URL_DEFAULT_IMAGE}
            alt={el.name}
            title={el.name}
            href={`/category/products/${el.id}`}
          />
        </Grid>
      );
    });
  }, [dataCategory]);

  return (
    <Wrapper>
      <Grid container spacing="2.5rem">
        {render}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled(Container)(({ theme }) => {
  return {
    padding: "2.5rem 0",
  };
});
