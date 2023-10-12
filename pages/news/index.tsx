import { PAGES_API } from "@/apis";
import { News } from "@/containers";
import { transformUrl } from "@/libs";
import { GetStaticPropsContext } from "next";
import { PAGE_TYPES } from "@/__generated__/END_POINT";
import { NewsPageProps } from "@/containers/News/News";

import prefetchData from "@/libs/prefetchData";

export default function NewsPage(props: NewsPageProps) {
  return <News {...props} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const { locale } = context;

    const urls = [
      transformUrl(PAGES_API, {
        type: PAGE_TYPES.NEWS_NEWSCATEGORYLISTINGPAGE,
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: PAGE_TYPES.NEWS_NEWSCATEGORYDETAILPAGE,
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
