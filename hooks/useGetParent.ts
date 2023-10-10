import useSWR from "swr";
import { useMemo } from "react";
import { useRouter } from "next/router";

import { transformUrl } from "@/libs";
import { PAGES_END_POINT } from "@/__generated__/END_POINT";

function useGetParent() {
  const router = useRouter();

  const { data } = useSWR(() => {
    if (router.query.id == undefined) return;

    return transformUrl(`${PAGES_END_POINT}${router.query.id}`, {
      fields: "*",
      locale: router.locale,
    });
  });

  const memoData = useMemo(() => {
    if (data == undefined) return {};

    return data;
  }, [data]);

  return {
    parentData: memoData,
  };
}
export default useGetParent;
