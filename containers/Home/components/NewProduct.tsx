import { useMemo } from "react";
import { Container, Grid } from "@mui/material";

import WrapperContent from "./WrapperContent";
import { CardProductItem } from "@/compositions";
import { PRODUCT_PAGE_TYPE_ITEM_TYPE } from "@/__generated__";
import { useIntl } from "@/hooks";

interface Props {
  data: PRODUCT_PAGE_TYPE_ITEM_TYPE[];
}

export default function NewProduct({ data }: Props) {
  const { messages } = useIntl();

  const render = useMemo(() => {
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
