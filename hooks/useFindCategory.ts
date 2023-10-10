import { useMemo } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";

import { transformUrl } from "@/libs";

import {
  PRODUCT_CATEGORY_LISTING_PAGE_TYPE,
  PRODUCT_CATEGORY_LISTING_PAGE_TYPE_ITEM_TYPE,
} from "@/__generated__";
import { PAGES_END_POINT, _END_POINT } from "@/__generated__/END_POINT";

function useFindCategory(categoryId: string) {
  const router = useRouter();

  const { data: currentCategoryData } =
    useSWR<PRODUCT_CATEGORY_LISTING_PAGE_TYPE_ITEM_TYPE>(() => {
      if (!router.query.id) return;

      return transformUrl(`${PAGES_END_POINT}${router.query.id}`, {
        fields: "*",
        locale: router.locale,
      });
    });

  const { data: parentData } = useSWR<PRODUCT_CATEGORY_LISTING_PAGE_TYPE>(
    transformUrl(PAGES_END_POINT, {
      type: "product.ProductCategoryDetailPage",
      fields: "*",
      locale: router.locale,
      ancestor_of: categoryId,
    })
  );

  const memoParentData = useMemo(() => {
    if (parentData == undefined) return [];

    return parentData.items;
  }, [parentData]);

  const memoCurrentData = useMemo(() => {
    if (currentCategoryData == undefined) return {};

    return currentCategoryData;
  }, [currentCategoryData]);

  return { categoryData: [...memoParentData, memoCurrentData] };
}

export default useFindCategory;
