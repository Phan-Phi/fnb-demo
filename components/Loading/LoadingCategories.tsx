import { useMedia } from "@/hooks";
import React, { useMemo } from "react";
import LoadingCategoryItem from "./LoadingCategoryItem";
import { Grid } from "@mui/material";

export default function LoadingCategories() {
  const { isMdDown, isSmDown } = useMedia();

  const renderLoadingItem = useMemo(() => {
    if (isMdDown) {
      return Array()
        .fill(3)
        .map((item, index) => {
          return (
            <Grid item key={index} xs={4}>
              <LoadingCategoryItem />
            </Grid>
          );
        });
    }

    if (isSmDown) {
      return Array()
        .fill(2)
        .map((item, index) => {
          return (
            <Grid item key={index} xs={6}>
              <LoadingCategoryItem />
            </Grid>
          );
        });
    }

    return Array(6)
      .fill(0)
      .map((item, index) => {
        return (
          <Grid item key={index} xs={4}>
            <LoadingCategoryItem />
          </Grid>
        );
      });
  }, [isMdDown, isSmDown]);

  return (
    <Grid container className="loading-products" rowSpacing="16px" columnSpacing="20px">
      {renderLoadingItem}
    </Grid>
  );
}
