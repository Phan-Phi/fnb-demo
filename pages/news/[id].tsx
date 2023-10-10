import { PAGE_TYPES } from "@/__generated__/END_POINT";
import { PAGES_API } from "@/apis";
import { NewsDetail } from "@/containers";
import { NewsDetailPageProps } from "@/containers/News/NewsDetail";
import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { GetServerSidePropsContext } from "next";

export default function NewsDetailPage(props: NewsDetailPageProps) {
  return <NewsDetail {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale, query } = context;

    const urls = [
      transformUrl(`${PAGES_API}${query.id}`, {
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: PAGE_TYPES.NEWS_NEWSPAGE,
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
