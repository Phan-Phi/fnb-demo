import React from "react";
import { GetServerSidePropsContext } from "next";

import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";

import { ProductDetail } from "@/containers";
import { ProductDetailProps } from "@/containers/Products/ProductDetail";

import { PAGES_END_POINT, PRODUCTS_VARIANTS_END_POINT } from "@/__generated__";

export default function ProductDetailPage(props: ProductDetailProps) {
  return <ProductDetail {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale, query } = context;

    const urls = [
      transformUrl(`${PAGES_END_POINT}${query.id}`, {
        fields: "*",
        locale,
      }),
      transformUrl(PRODUCTS_VARIANTS_END_POINT, {
        fields: "*",
        locale,
        product: query.id,
      }),
    ];

    const { fallback, resList } = await prefetchData(urls, { locale });

    return {
      props: {
        initData: resList,
        fallback,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
