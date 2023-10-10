import { useState } from "react";
import {
  Container,
  FormControlLabel,
  Grow,
  Paper,
  Switch,
  Typography,
} from "@mui/material";

import { useIntl } from "@/hooks";
import { Box } from "@/components";
import WrapperContent from "./WrapperContent";
import ProductSlider from "@/compositions/ProductSlider/ProductSlider";
import { PAGE_TYPES } from "@/__generated__";
import { useRouter } from "next/router";

export default function OutstandingProducts() {
  const { messages } = useIntl();
  const { locale } = useRouter();

  return (
    <Container>
      <WrapperContent title={messages["home.outStandingProducts"]}>
        <ProductSlider
          option={{
            limit: 10,
            offset: 0,
            fields: "*",
            locale: locale,
            type: PAGE_TYPES.PRODUCT_PRODUCTPAGE,
          }}
        />
      </WrapperContent>
    </Container>
  );
}
