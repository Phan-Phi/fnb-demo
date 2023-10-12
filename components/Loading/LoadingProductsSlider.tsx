import { useMemo } from "react";
import { Grid } from "@mui/material";

import { useMedia } from "@/hooks";
import LoadingProductSliderItem from "./LoadingProducSlidertItem";

type LoadingProductsSliderProps = {
  isHomePage?: boolean;
};

export default function LoadingProductsSlider({
  isHomePage = false,
}: LoadingProductsSliderProps) {
  const { isMdDown, isSmDown } = useMedia();

  const renderLoadingItem = useMemo(() => {
    if (isMdDown) {
      return Array()
        .fill(3)
        .map((item, index) => {
          return (
            <Grid item key={index} xs={4}>
              <LoadingProductSliderItem />
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
              <LoadingProductSliderItem />
            </Grid>
          );
        });
    }

    return Array(4)
      .fill(0)
      .map((item, index) => {
        return (
          <Grid item key={index} xs={3}>
            <LoadingProductSliderItem />
          </Grid>
        );
      });
  }, [isMdDown, isSmDown]);

  const renderLoadingProductForHomePage = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((item, index) => (
        <Grid item key={index} xs={2.4}>
          <LoadingProductSliderItem />
        </Grid>
      ));
  }, []);

  return (
    <Grid container className="loading-products" rowSpacing="16px" columnSpacing="20px">
      {isHomePage ? renderLoadingProductForHomePage : renderLoadingItem}
    </Grid>
  );
}
