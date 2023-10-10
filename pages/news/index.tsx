import { PAGE_TYPES } from "@/__generated__/END_POINT";
import { PAGES_API } from "@/apis";
import { News } from "@/containers";
import { NewsPageProps } from "@/containers/News/News";
import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { GetStaticPropsContext } from "next";

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
        type: PAGE_TYPES.NEWS_NEWSPAGE,
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
