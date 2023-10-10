import React, { useMemo } from "react";

import { get, isEmpty } from "lodash";
import { Box, Container, Grid, Grow } from "@mui/material";

import { CardCategoryItem } from "@/compositions";
import { LoadingCategories, SEO, Spacing, Title } from "@/components";

import { IPage } from "@/interfaces";
import { getSeoObject } from "@/libs";
import { useCheckCategory } from "@/hooks";
import { URL_DEFAULT_IMAGE } from "@/constants";
import { PRODUCT_CATEGORY_LISTING_PAGE_TYPE } from "@/__generated__";

export type CategoryListProps = IPage<[PRODUCT_CATEGORY_LISTING_PAGE_TYPE]>;

export default function CategoryList(props: CategoryListProps) {
  const dataListing = get(props, "initData[0].items");
  const meta = get(dataListing, "[0].meta");

  const title = get(dataListing, "[0].title");

  const { data: dataCategory, isLoading } = useCheckCategory();

  const renderCategoryItem = useMemo(() => {
    if (dataCategory == undefined) return null;

    const filteredData = dataCategory.filter((item) => {
      return item.products.length > 0;
    });

    const LoadingComponent = <LoadingCategories />;

    let content: React.ReactNode = null;

    if (filteredData == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(filteredData) && !isLoading) {
      content = <Box />;
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Grid container rowSpacing="20px" columnSpacing="16px">
            {filteredData.map((item, index) => {
              return (
                <Grid item xs={4} key={item.id}>
                  <Grow in={true} timeout={index * 70 + 600}>
                    <Box>
                      <CardCategoryItem
                        imageSrc={item.banner || URL_DEFAULT_IMAGE}
                        alt={item.name}
                        title={item.name}
                        href={`/category/products/${item.id}`}
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
  }, [dataCategory, isLoading]);

  return (
    <Container>
      <SEO {...getSeoObject(meta)} />

      <Grid container rowSpacing="20px" columnSpacing="16px">
        <Grid item xs={12}>
          <Box>
            <Title>{title}</Title>
            <Spacing spacing={2.5} />
          </Box>
        </Grid>

        {renderCategoryItem}
      </Grid>
    </Container>
  );
}
