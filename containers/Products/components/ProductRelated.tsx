import React, { useMemo } from "react";
import { useRouter } from "next/router";

import { isEmpty } from "lodash";
import { Box, Grid, Grow, styled } from "@mui/material";

import { CardProductItem } from "@/compositions";
import { LoadingProducts, NoProducts, Spacing, Title, Pagination } from "@/components";

import { useIntl } from "@/hooks";
import { PRODUCT_PAGE_TYPE_ITEM_TYPE } from "@/__generated__";

type ProductRelatedProps = {
  data: PRODUCT_PAGE_TYPE_ITEM_TYPE[] | undefined;
  handlePagination: any;
  isLoading: boolean;
  totalPage: number;
};

export default function ProductRelated(props: ProductRelatedProps) {
  const router = useRouter();
  const { messages } = useIntl();
  const { data, handlePagination, isLoading, totalPage } = props;

  const filteredData = useMemo(() => {
    if (data == undefined) return [];

    return data.filter((item) => {
      const currentProductId = router.query.id as string;

      return item.id !== parseInt(currentProductId);
    });
  }, [data, router.query.id]);

  const renderProducts = useMemo(() => {
    const LoadingComponent = <LoadingProducts isHomePage={true} />;

    let content: React.ReactNode = null;

    if (filteredData == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(filteredData) && !isLoading) {
      content = <NoProducts />;
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Grid container rowSpacing="20px" columnSpacing="16px">
            {filteredData.map((item, index) => {
              return (
                <Grid item xs={2.4} key={index}>
                  <Grow in={true} timeout={index * 70 + 600}>
                    <Box>
                      <CardProductItem
                        isHomePage={true}
                        title={item.title}
                        alt={item.title}
                        imageSrc={item.images[0].value || ""}
                        price={item.first_variant_price}
                        isExported={item.is_exported}
                        id={item.id}
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
  }, [filteredData, isLoading]);

  return (
    <StyledWrapper isDataEmpty={isEmpty(filteredData)} isLoading={!isLoading}>
      <Title>{messages["brandsRelated.bannerSubTitle"]}</Title>

      <Spacing spacing={3} />

      {renderProducts}

      <Spacing spacing={2} />

      <Pagination count={totalPage} onchange={handlePagination} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box, {
  shouldForwardProp: (propName) => propName !== "isDataEmpty" && propName !== "isLoading",
})<{ isDataEmpty: boolean; isLoading: boolean }>(({ isDataEmpty, isLoading }) => {
  if (isDataEmpty && isLoading) {
    return {
      display: "none",
    };
  }
  return {
    "& .MuiPaginationItem-page, .MuiPaginationItem-ellipsis": {
      display: "none",
    },
  };
});
