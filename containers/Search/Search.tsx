import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { get, isEmpty } from "lodash";
import { Box, Container, Grid, Grow, Stack, styled } from "@mui/material";

import { CardProductItem } from "@/compositions";
import {
  LoadingProducts,
  NoProducts,
  Pagination,
  SEO,
  Spacing,
  Title,
} from "@/components";

import { getSeoObject, transformUrl } from "@/libs";
import { useCart, useFetch, useParams } from "@/hooks";

import {
  PAGE_TYPES,
  PAGES_END_POINT,
  PRODUCT_PAGE_TYPE_ITEM_TYPE,
  PRODUCT_CATEGORY_LISTING_PAGE_TYPE,
} from "@/__generated__";

import { IPage } from "@/interfaces";

export type SearchProps = IPage<[PRODUCT_CATEGORY_LISTING_PAGE_TYPE]>;

export default function Search(props: SearchProps) {
  const meta = get(props, "initData[0].items[0].meta");

  const router = useRouter();
  const { isExported } = useCart();

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimation, setIsAnimation] = useState(true);

  const { params, setParams } = useParams({
    initState: {
      limit: 16,
      offset: 0,
      fields: "*",
      is_exported: isExported ? true : "false",
      locale: router.locale,
      type: PAGE_TYPES["PRODUCT_PRODUCTPAGE"],
      search: router.query.search,
      search_operator: "or",
    },
    excludeKeys: [
      "type",
      "locale",
      "fields",
      "limit",
      "offset",
      "is_exported",
      "search_operator",
    ],
  });

  const { data, resData, changeKey, isLoading } = useFetch<PRODUCT_PAGE_TYPE_ITEM_TYPE>(
    transformUrl(PAGES_END_POINT, params)
  );

  useEffect(() => {
    setParams({
      offset: 0,
      search: router.query.search,
    });

    setCurrentPage(1);
  }, [router.query.search]);

  useEffect(() => {
    changeKey(transformUrl(PAGES_END_POINT, params));
  }, [params.search, params.offset, params.limit]);

  useEffect(() => {
    if (resData == undefined) return;

    const totalCount = resData.meta.total_count;
    setTotalPage(Math.ceil(totalCount / 16));

    // if (isMdDown) {
    //   setTotalPage(Math.ceil(totalCount / 6));
    //   setParams({
    //     limit: 6,
    //   });
    // } else {
    //   setTotalPage(Math.ceil(totalCount / 8));
    //   setParams({
    //     limit: 8,
    //   });
    // }
  }, [resData]);

  useEffect(() => {
    changeKey(transformUrl(PAGES_END_POINT, params));
  }, [params.search, params.offset, params.limit]);

  const renderProducts = useMemo(() => {
    const LoadingComponent = <LoadingProducts />;

    let content: React.ReactNode = null;

    if (data == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(data) && !isLoading) {
      content = (
        <StyledCenter>
          <NoProducts />
        </StyledCenter>
      );
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Grid container rowSpacing="20px" columnSpacing="16px">
            {data.map((item, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <Grow in={isAnimation} timeout={index * 70 + 600}>
                    <Box>
                      <CardProductItem
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
  }, [data, isLoading, isAnimation]);

  const handlePagination = useCallback(
    (event: React.SyntheticEvent, page: number) => {
      setCurrentPage(page);

      if (currentPage === page) return;

      setParams({
        offset: (page - 1) * params.limit,
      });

      setIsAnimation((prev) => !!prev);
    },
    [params, currentPage]
  );

  return (
    <Container>
      <SEO {...getSeoObject(meta)} />
      <Title>{`Tìm kiếm: "${router.query.search}"`}</Title>

      <Spacing spacing={2} />

      {renderProducts}

      <Spacing spacing={2} />

      <StyledWrapperPagination isDataEmpty={isEmpty(data)} isLoading={!isLoading}>
        <Pagination count={totalPage} onchange={handlePagination} />
      </StyledWrapperPagination>
    </Container>
  );
}

const StyledWrapperPagination = styled(Box, {
  shouldForwardProp: (propName) => propName !== "isDataEmpty" && propName !== "isLoading",
})<{ isDataEmpty: boolean; isLoading: boolean }>(({ isDataEmpty, isLoading }) => {
  if (isDataEmpty && isLoading) {
    return {
      display: "none",
    };
  } else {
    return {
      display: "block",
    };
  }
});

const StyledCenter = styled(Stack)(() => {
  return {
    padding: "40px 0",
  };
});
