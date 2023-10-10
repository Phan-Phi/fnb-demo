import React, { useMemo } from "react";
import { useRouter } from "next/router";

import { Stack, Typography, styled } from "@mui/material";

import CategoryItem from "./CategoryItem";

import { ROUTES } from "@/routes";
import { useCheckCategory, useIntl } from "@/hooks";
import { URL_DEFAULT_IMAGE } from "@/constants";

export default function Categories() {
  const { messages } = useIntl();
  const router = useRouter();
  const { data } = useCheckCategory();

  const renderCategoryItem = useMemo(() => {
    if (data == undefined) return null;

    const filteredData = data.filter((item) => {
      const currentId = parseInt(router.query.id as string);

      return item.id !== currentId && item.products.length > 0;
    });

    return filteredData.map((item) => {
      return (
        <CategoryItem
          key={item.id}
          alt={item.name}
          title={item.name}
          imageSrc={item.banner || URL_DEFAULT_IMAGE}
          href={`/${ROUTES.categoryList}/${ROUTES.products}/${item.id}`}
        />
      );
    });
  }, [data, router.query.id]);

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
