import { useMemo } from "react";
import { styled } from "@mui/material";

import ProductSlider from "@/compositions/ProductSlider/ProductSlider";

import { Box } from "@/components";
import { useRouter } from "next/router";
import { useCart, useMedia } from "@/hooks";
import { PAGE_TYPES } from "@/__generated__";

interface Props {
  data: any;
}

export default function TrendingProducts({ data }: Props) {
  const { title, id } = data;

  const { locale } = useRouter();
  const { isMdDown } = useMedia();
  const { isExported } = useCart();

  const render = useMemo(() => {
    return (
      <ProductSlider
        title={title}
        option={{
          limit: isMdDown ? 6 : 10,
          offset: 0,
          fields: "*",
          locale: locale,
          type: PAGE_TYPES.PRODUCT_PRODUCTPAGE,
          is_exported: isExported ? true : "false",
          descendant_of: id,
        }}
      />
    );
  }, [isMdDown, isExported, title]);

  return (
    <Wrapper>
      {render}
      {/* <ProductSlider
        title={title}
        option={{
          limit: 10,
          offset: 0,
          fields: "*",
          locale: locale,
          type: PAGE_TYPES.PRODUCT_PRODUCTPAGE,
          is_exported: isExported ? true : "false",
          descendant_of: id,
        }}
      /> */}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {};
});
