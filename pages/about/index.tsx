import prefetchData from "@/libs/prefetchData";

import { PAGES_API } from "@/apis";
import { About } from "@/containers";
import { transformUrl } from "@/libs";
import { PAGE_TYPES } from "@/__generated__/END_POINT";
import { AboutPageProps } from "@/containers/About/About";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";

export default function AboutPage(props: AboutPageProps) {
  return <About {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;

    const urls = [
      transformUrl(PAGES_API, {
        type: PAGE_TYPES.ABOUT_ABOUTPAGE,
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
