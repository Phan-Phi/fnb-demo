import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { Grid, Grow, styled } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

import { transformUrl } from "@/libs";
import { useFetch, useParams } from "@/hooks";
import { PAGES_END_POINT, PAGE_TYPES } from "@/__generated__";
import { Box, LoadingProducts, Pagination, Stack } from "@/components";

import CardProductItem from "../CardProduct/CardProductItem";

interface Props {
  url?: string;
  params: object;
}

export default function ProductSliderClone() {
  const { locale } = useRouter();
  const [checked, setChecked] = useState(true);
  const [totalPage, setTotalPage] = useState(0);

  const { params, setParams } = useParams({
    initState: {
      limit: 10,
      offset: 0,
      fields: "*",
      locale: locale,
      type: PAGE_TYPES.PRODUCT_PRODUCTPAGE,
    },
    excludeKeys: ["type", "locale", "fields", "limit", "offset"],
  });

  const { data, isLoading, changeKey, resData } = useFetch<any>(
    transformUrl(PAGES_END_POINT, params)
  );

  useEffect(() => {
    changeKey(transformUrl(PAGES_END_POINT, params));
  }, [params]);

  useEffect(() => {
    if (resData == undefined) return;

    setTotalPage(Math.ceil(resData?.meta.total_count / 10));
  }, [resData]);

  const handlePagination = useCallback((event: React.SyntheticEvent, page: number) => {
    setParams({
      offset: (page - 1) * params.limit,
    });
    setChecked((prev) => !!prev);
  }, []);

  const renderItem = useMemo(() => {
    const LoadingComponent = (
      <>
        <LoadingProducts isHomePage />
        <LoadingProducts isHomePage />
      </>
    );

    let content: React.ReactNode = null;

    if (data == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(data) && !isLoading) {
      content = <StyledCenter>Không có sản phẩm</StyledCenter>;
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Grid container columns={10} spacing={2}>
            {data.map((el, idx) => {
              return (
                <Grid item xs={2} key={idx}>
                  <Grow in={checked} timeout={idx * 70 + 600}>
                    <Box>
                      <CardProductItem
                        isHomePage
                        title={el.title}
                        alt={el.title}
                        imageSrc={el.images[0].value || ""}
                        price={el.first_variant_price}
                        isExported={el.is_exported}
                        id={el.id}
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
  }, [data, isLoading, checked]);

  return (
    <Wrapper>
      {renderItem}

      <Pagination count={totalPage} onchange={handlePagination} />
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    "& .MuiPaginationItem-page, .MuiPaginationItem-ellipsis": {
      display: "none",
    },
  };
});

const StyledCenter = styled(Stack)(() => {
  return {
    gap: 20,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  };
});
