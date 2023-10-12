import React, { Fragment, useMemo } from "react";

import { isEmpty } from "lodash";
import { Skeleton, Stack, Typography, styled } from "@mui/material";

import { ROUTES } from "@/routes";
import CategoryItem from "./CategoryItem";
import { URL_DEFAULT_IMAGE } from "@/constants";
import { useCheckCategory, useIntl } from "@/hooks";

export default function Categories() {
  const { messages } = useIntl();
  const { data, isLoading } = useCheckCategory();

  const renderCategoryItem = useMemo(() => {
    if (data == undefined) return null;

    const filteredData = data.filter((item) => {
      return item.products.length > 0;
    });

    const LoadingComponent = <LoadingCategories />;

    let content: React.ReactNode = null;

    if (filteredData == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(filteredData) && !isLoading) {
      content = <StyledText>{messages["product.empty"]}</StyledText>;
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Fragment>
            {filteredData.map((item) => {
              return (
                <CategoryItem
                  id={item.id}
                  key={item.id}
                  alt={item.name}
                  title={item.name}
                  imageSrc={item.banner || URL_DEFAULT_IMAGE}
                  href={`/${ROUTES.categoryList}/${ROUTES.products}/${item.id}`}
                />
              );
            })}
          </Fragment>
        );
      }
    }

    return content;
  }, [data, isLoading]);

  return (
    <Stack gap="16px">
      <StyledTitle>{messages["categories"]}</StyledTitle>

      {renderCategoryItem}
    </Stack>
  );
}

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    color: theme.palette.text.primary,
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.Roboto,
    color: theme.palette.text.primary,
    fontSize: 14,
    lineHeight: "24px",
    fontWeight: 400,
  };
});

const LoadingCategories = () => {
  return (
    <Stack gap="16px">
      <Skeleton variant="rounded" height={30} width={"80%"} />
      <Skeleton variant="rounded" height={30} width={"80%"} />
      <Skeleton variant="rounded" height={30} width={"80%"} />
      <Skeleton variant="rounded" height={30} width={"80%"} />
    </Stack>
  );
};
