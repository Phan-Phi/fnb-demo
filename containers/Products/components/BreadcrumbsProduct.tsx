import React, { useMemo } from "react";
import { useRouter } from "next/router";

import { ChevronRightIcon } from "@/components";
import { Breadcrumbs, Typography, styled } from "@mui/material";

type BreadcrumbsProductProps = {
  arrayBreadcrumbs: [];
};

export default function BreadcrumbsProduct({
  arrayBreadcrumbs,
}: BreadcrumbsProductProps) {
  const router = useRouter();

  const renderBreadcrumbs = useMemo(() => {
    if (arrayBreadcrumbs == undefined) return null;

    return arrayBreadcrumbs.map((item: any, index) => {
      const isFirstItem = index === 0;
      const isLastItem = arrayBreadcrumbs.length - 1 === index;
      const href = isFirstItem ? "/category" : `/category/products/${item.id}`;

      return isLastItem ? (
        <StyledTypo key={index}>{item.title}</StyledTypo>
      ) : (
        <StyledLink
          key={index}
          onClick={() => {
            router.push(href);
          }}
        >
          {item.title}
        </StyledLink>
      );
    });
  }, [arrayBreadcrumbs]);

  return <Breadcrumbs separator={<ChevronRightIcon />}>{renderBreadcrumbs}</Breadcrumbs>;
}

const StyledLink = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.Inter_large,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: theme.palette.text.primary,
    textTransform: "capitalize",
    cursor: "pointer",
  };
});

const StyledTypo = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.Inter_large,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: theme.palette.primary.main,
    textTransform: "capitalize",
  };
});
