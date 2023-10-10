import React, { useMemo } from "react";
import { Grid } from "@mui/material";

import { useMedia } from "@/hooks";
import LoadingProductItem from "./LoadingProductItem";

type LoadingProductsProps = {
  isHomePage?: boolean;
};

export default function LoadingProducts({ isHomePage = false }: LoadingProductsProps) {
  const { isMdDown, isSmDown } = useMedia();

  const renderLoadingItem = useMemo(() => {
    if (isMdDown) {
      return Array()
        .fill(3)
        .map((item, index) => {
          return (
            <Grid item key={index} xs={4}>
              <LoadingProductItem />
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
              <LoadingProductItem />
            </Grid>
          );
        });
    }

    return Array(4)
      .fill(0)
      .map((item, index) => {
        return (
          <Grid item key={index} xs={3}>
            <LoadingProductItem />
          </Grid>
        );
      });
  }, [isMdDown, isSmDown]);

  const renderLoadingProductForHomePage = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((item, index) => (
        <Grid item key={index} xs={2.4}>
          <LoadingProductItem />
        </Grid>
      ));
  }, []);

  return (
    <Grid container className="loading-products" rowSpacing="16px" columnSpacing="20px">
      {isHomePage ? renderLoadingProductForHomePage : renderLoadingItem}
    </Grid>
  );
}
