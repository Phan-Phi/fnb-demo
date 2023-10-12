import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { Container, Grid } from "@mui/material";

import WrapperContent from "./WrapperContent";

import { transformUrl } from "@/libs";
import { CardProductItem } from "@/compositions";
import { useCart, useFetch, useIntl } from "@/hooks";
import { PAGES_END_POINT, PAGE_TYPES } from "@/__generated__";

const params = {
  type: PAGE_TYPES.PRODUCT_PRODUCTPAGE,
  fields: "*",
  order: "-first_published_at",
  limit: 10,
};

export default function NewProduct() {
  const { locale } = useRouter();
  const { messages } = useIntl();
  const { isExported } = useCart();

  const { data, isLoading, changeKey, resData } = useFetch<any>(
    transformUrl(PAGES_END_POINT, { ...params, is_exported: isExported, locale })
  );

  useEffect(() => {
    changeKey(
      transformUrl(PAGES_END_POINT, { ...params, is_exported: isExported, locale })
    );
  }, [locale, isExported]);

  const render = useMemo(() => {
    if (data == undefined) return null;

    return data.map((el, idx) => {
      return (
        <Grid item xs={2} key={idx}>
          <CardProductItem
            isHomePage
            title={el.title}
            alt={el.title}
            imageSrc={el.images[0].value || ""}
            price={el.first_variant_price}
            isExported={el.is_exported}
            id={el.id}
          />
        </Grid>
      );
    });
  }, [data]);

  return (
    <Container>
      <WrapperContent title={messages["home.newProducts"]}>
        <Grid container columns={10} spacing={2}>
          {render}
        </Grid>
      </WrapperContent>
    </Container>
  );
}
