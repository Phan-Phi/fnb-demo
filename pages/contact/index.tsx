import React from "react";
import { GetStaticPropsContext } from "next";

import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";

import { Contact } from "@/containers";
import { ContactProps } from "@/containers/Contact/Contact";
import { PAGES_END_POINT, PAGE_TYPES } from "@/__generated__/END_POINT";

export default function ContactPage(props: ContactProps) {
  return <Contact {...props} />;
}
export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const { locale } = context;

    const urls = [
      transformUrl(PAGES_END_POINT, {
        type: PAGE_TYPES["CONTACT_CONTACTPAGE"],
        fields: "*",
        locale,
      }),
    ];

    const { resList, fallback } = await prefetchData(urls, {
      locale,
    });

    return {
      props: {
        initData: resList,
        fallback,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
