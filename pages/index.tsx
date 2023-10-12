import { Home } from "@/containers";
import { transformUrl } from "@/libs";
import { GetStaticPropsContext } from "next";
import { HomePageProps } from "@/containers/Home/Home";
import { PAGES_END_POINT, PAGE_TYPES } from "@/__generated__/END_POINT";

import prefetchData from "@/libs/prefetchData";

export default function HomePage(props: HomePageProps) {
  return <Home {...props} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const { locale } = context;

    const urls = [
      transformUrl(PAGES_END_POINT, {
        type: PAGE_TYPES.HOME_HOMEPAGE,
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_END_POINT, {
        type: PAGE_TYPES.PRODUCT_PRODUCTCATEGORYDETAILPAGE,
        fields: "*",
        limit: 10,
        featured: true,
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
