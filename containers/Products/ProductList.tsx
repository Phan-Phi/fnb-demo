import { useUpdateEffect } from "react-use";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { get, isEmpty } from "lodash";
import { Box, Container, Grid, Grow, Stack, styled } from "@mui/material";

import Sort from "./components/Sort";
import Categories from "./components/Categories";
import { CardProductItem } from "@/compositions";
import BreadcrumbsProduct from "./components/BreadcrumbsProduct";
import { Banner, LoadingProducts, NoProducts, Pagination, SEO } from "@/components";

import { IPage } from "@/interfaces";
import { URL_DEFAULT_IMAGE } from "@/constants";
import { getSeoObject, transformUrl } from "@/libs";
import {
  useCart,
  useFetch,
  useFindCategory,
  useGetParent,
  useIntl,
  useParams,
} from "@/hooks";

import {
  PRODUCT_PAGE_TYPE_ITEM_TYPE,
  PRODUCT_CATEGORY_LISTING_PAGE_TYPE,
} from "@/__generated__";
import { PAGES_END_POINT, PAGE_TYPES } from "@/__generated__/END_POINT";

export type ProductListProps = IPage<[PRODUCT_CATEGORY_LISTING_PAGE_TYPE]>;

export default function ProductList(props: ProductListProps) {
  const { messages } = useIntl();
  const meta = get(props, "initData[0].items[0].meta");

  const { isExported } = useCart();
  const { parentData } = useGetParent();
  const parentId = get(parentData, "id") as string;
  const { categoryData } = useFindCategory(parentId);

  const arr: any = [
    {
      title: messages["product"],
      href: "/category",
    },
    ...categoryData,
  ];

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimation, setIsAnimation] = useState(true);

  const { params, setParams } = useParams({
    initState: {
      limit: 16,
      offset: 0,
      fields: "*",
      locale: "vi",
      type: PAGE_TYPES["PRODUCT_PRODUCTPAGE"],
      descendant_of: parentId,
      is_exported: isExported ? true : "false",
    },
    omitQuery: {
      id: undefined,
    },
    excludeKeys: [
      "type",
      "locale",
      "fields",
      "limit",
      "offset",
      "is_exported",
      "descendant_of",
      "order",
    ],
  });

  const {
    data: dataProduct,
    resData,
    changeKey,
    isLoading,
  } = useFetch<PRODUCT_PAGE_TYPE_ITEM_TYPE>(transformUrl(PAGES_END_POINT, params));

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

  useUpdateEffect(() => {
    if (parentId) {
      setParams({
        offset: 0,
        descendant_of: parentId,
      });
    }

    setCurrentPage(1);
  }, [parentId]);

  useUpdateEffect(() => {
    changeKey(transformUrl(PAGES_END_POINT, params));
  }, [params]);

  const renderProducts = useMemo(() => {
    const LoadingComponent = <LoadingProducts />;

    let content: React.ReactNode = null;

    if (dataProduct == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(dataProduct) && !isLoading) {
      content = <NoProducts />;
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Grid container rowSpacing="20px" columnSpacing="16px">
            {dataProduct.map((item, index) => {
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
  }, [dataProduct, isLoading, isAnimation]);

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

  if (parentData == undefined) return null;

  return (
    <Container>
      <Stack gap="16px">
        <SEO {...getSeoObject(meta)} />

        <BreadcrumbsProduct arrayBreadcrumbs={arr} />

        <Banner
          imgSrc={parentData.banner || URL_DEFAULT_IMAGE}
          title={parentData.title}
        />

        <Grid container spacing="24px">
          <Grid item xs={2}>
            <Categories />
          </Grid>
          <Grid item xs={10}>
            <Stack gap="16px">
              <StyledWrapperSort isExported={isExported}>
                <Sort setParams={setParams} />
              </StyledWrapperSort>

              {renderProducts}

              <StyledWrapperPagination
                isDataEmpty={isEmpty(dataProduct)}
                isLoading={!isLoading}
              >
                <Pagination count={totalPage} onchange={handlePagination} />
              </StyledWrapperPagination>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
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

const StyledWrapperSort = styled(Stack, {
  shouldForwardProp: (propName) => propName !== "isExported",
})<{ isExported: boolean }>(({ isExported }) => {
  return {
    alignItems: "flex-end",

    display: isExported ? "none" : "flex",
  };
});
