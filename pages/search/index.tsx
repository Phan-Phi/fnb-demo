import React from "react";
import { GetServerSidePropsContext } from "next";

import { Search } from "@/containers";
import { SearchProps } from "@/containers/Search/Search";

import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { PAGES_END_POINT, PAGE_TYPES } from "@/__generated__";

export default function SearchPage(props: SearchProps) {
  return <Search {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;

    const urls = [
      transformUrl(PAGES_END_POINT, {
        fields: "*",
        locale,
        type: PAGE_TYPES["PRODUCT_PRODUCTCATEGORYLISTINGPAGE"],
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
