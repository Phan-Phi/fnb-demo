import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { useCart, useFetch } from ".";
import { transformUrl } from "@/libs";

import {
  PAGE_TYPES,
  PAGES_END_POINT,
  PRODUCT_PAGE_TYPE_ITEM_TYPE,
  PRODUCT_CATEGORY_DETAIL_PAGE_TYPE_ITEM_TYPE,
} from "@/__generated__";

type CATEGORY_ITEM_TYPE = {
  id: number;
  name: string;
  banner: string | null;
  products: any[];
};

function useCheckCategory() {
  const router = useRouter();
  const { isExported } = useCart();
  const [categories, setCategories] = useState<CATEGORY_ITEM_TYPE[]>([]);

  const { data: allProductData } = useFetch<PRODUCT_PAGE_TYPE_ITEM_TYPE>(
    transformUrl(PAGES_END_POINT, {
      locale: router.locale,
      fields: "*",
      limit: 10000,
      type: PAGE_TYPES["PRODUCT_PRODUCTPAGE"],
      is_exported: isExported ? true : "false",
    })
  );

  const { data: dataCategory, isLoading } =
    useFetch<PRODUCT_CATEGORY_DETAIL_PAGE_TYPE_ITEM_TYPE>(
      transformUrl(PAGES_END_POINT, {
        limit: 1000,
        locale: router.locale,
        fields: "*",
        type: PAGE_TYPES["PRODUCT_PRODUCTCATEGORYDETAILPAGE"],
      })
    );

  useEffect(() => {
    if (dataCategory == undefined || allProductData == undefined) return;

    const obj: CATEGORY_ITEM_TYPE[] = [];

    dataCategory.map((item) => {
      const category: CATEGORY_ITEM_TYPE = {
        id: item.id,
        name: item.title,
        banner: item.banner,
        products: [],
      };

      obj.push(category);
    });

    obj.map((item) => {
      allProductData.map((ele) => {
        const product = {
          id: ele.id,
          name: ele.title,
        };

        if (item.id === ele.meta.parent.id) {
          item.products.push(product);
        }
      });
    });

    setCategories(obj);
  }, [dataCategory, allProductData]);

  const memoData = useMemo(() => {
    if (categories == undefined) return [];

    return categories;
  }, [categories]);

  return {
    data: memoData,
    isLoading,
  };
}

export default useCheckCategory;
