import { Skeleton, styled } from "@mui/material";
import React from "react";

type LoadingCategoryItemProps = {
  isHomePage?: boolean;
};

export default function LoadingCategoryItem({
  isHomePage = false,
}: LoadingCategoryItemProps) {
  return <StyledSkeleton variant="rectangular" height={300} isHomePage={isHomePage} />;
}

const StyledSkeleton = styled(Skeleton, {
  shouldForwardProp: (propName) => propName !== "isHomePage",
})<{ isHomePage: boolean }>(({ isHomePage }) => {
  return {
    borderRadius: isHomePage ? 16 : 4,
  };
});
