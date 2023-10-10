import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

import { get } from "lodash";
import { Box, Container, Grid, styled } from "@mui/material";

import { Banner, SEO } from "@/components";
import Carousel from "./components/Carousel";
import ProductInfo from "./components/ProductInfo";
import ProductRelated from "./components/ProductRelated";
import BreadcrumbsProduct from "./components/BreadcrumbsProduct";

import { IPage } from "@/interfaces";
import { URL_DEFAULT_IMAGE } from "@/constants";
import { getSeoObject, transformUrl } from "@/libs";
import { useCart, useFetch, useFindCategory, useParams } from "@/hooks";

import {
  PAGE_TYPES,
  PAGES_END_POINT,
  PRODUCTS_VARIANTS,
  PRODUCT_PAGE_TYPE_ITEM_TYPE,
} from "@/__generated__";

export type ProductDetailProps = IPage<[PRODUCT_PAGE_TYPE_ITEM_TYPE, PRODUCTS_VARIANTS]>;

export type IMAGES_TYPE = {
  block_type: string;
  value: string;
  id?: number;
};

export default function ProductDetail(props: ProductDetailProps) {
  const router = useRouter();
  const { isExported } = useCart();
  const productData = get(props, "initData[0]");
  const meta = get(productData, "meta");
  const productVariantData = get(props, "initData[1].items");

  const productId = get(productData, "id").toString();
  const parentId = get(productData, "meta.parent.id").toString();
  const { categoryData } = useFindCategory(productId);
  const arr: any = [
    {
      title: "Sản phẩm",
      href: "/category",
    },
    ...categoryData,
  ];

  const [images, setImages] = useState<IMAGES_TYPE[]>([]);

  const [refCarousel, setRefCarousel] = useState<any>({
    ref1: null,
    ref2: null,
  });

  const [variantId, setVariantId] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isAnimation, setIsAnimation] = useState(true);

  const { params, setParams } = useParams({
    initState: {
      limit: 10,
      offset: 0,
      fields: "*",
      locale: router.locale,
      type: PAGE_TYPES.PRODUCT_PRODUCTPAGE,
      child_of: parentId,
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
      "child_of",
      "is_exported",
    ],
  });

  const { data, resData, changeKey, isLoading } = useFetch<PRODUCT_PAGE_TYPE_ITEM_TYPE>(
    transformUrl(PAGES_END_POINT, {
      ...params,
    })
  );

  useEffect(() => {
    if (resData == undefined) return;

    const totalCount = resData.meta.total_count - 1;

    setTotalPage(Math.ceil(totalCount / 10));
  }, [resData]);

  useEffect(() => {
    changeKey(
      transformUrl(PAGES_END_POINT, {
        ...params,
        is_exported: isExported ? true : "false",
      })
    );
  }, [params.offset, isExported]);

  useEffect(() => {
    if (productData == undefined || productVariantData == undefined) return;

    const imageProduct = get(productData, "images");

    let arrImagesVariants: IMAGES_TYPE[] = [];

    productVariantData.map((item) => {
      item.images.map((el) => {
        let obj = {
          id: item.id,
          ...el,
        };
        arrImagesVariants.push(obj);
      });
    });

    let mergeArr = [...imageProduct, ...arrImagesVariants];

    setImages(mergeArr);
  }, [productData, productVariantData]);

  useEffect(() => {
    if (refCarousel.ref1) {
      const getVariantIndex = images.findIndex((item) => {
        return item.id === variantId;
      });

      refCarousel.ref1.slickGoTo(getVariantIndex, true);
    }
  }, [variantId, refCarousel.ref1, images]);

  const handlePagination = useCallback(
    (event: React.SyntheticEvent, page: number) => {
      setParams({
        offset: (page - 1) * params.limit,
      });

      setIsAnimation((prev) => !!prev);
    },
    [params]
  );

  if (productData == undefined || productVariantData == undefined) return null;

  return (
    <Container>
      <StyledWrapper>
        <SEO {...getSeoObject(meta)} />

        <Grid container spacing="40px" rowSpacing="16px" columnSpacing="40px">
          <Grid item xs={12}>
            <BreadcrumbsProduct arrayBreadcrumbs={arr} />
          </Grid>
          <Grid item xs={5}>
            <Carousel imageData={images} refCarousel={refCarousel} />
          </Grid>
          <Grid item xs={7}>
            <ProductInfo
              setVariantId={setVariantId}
              productData={productData}
              productVariantData={productVariantData}
            />
          </Grid>

          <Grid item xs={12}>
            <ProductRelated
              data={data}
              isLoading={isLoading}
              handlePagination={handlePagination}
              totalPage={totalPage}
              isAnimation={isAnimation}
            />
          </Grid>

          <Grid item xs={12}>
            <Banner imgSrc={URL_DEFAULT_IMAGE} />
          </Grid>
        </Grid>
      </StyledWrapper>
    </Container>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    padding: "0 16px",
  };
});
