import { Container, Typography } from "@mui/material";

import WrapperContent from "./WrapperContent";
import { useIntl } from "@/hooks";

export default function TrendingProducts() {
  const { messages } = useIntl();

  return (
    <Container>
      <WrapperContent title={messages["home.trendingProducts"]}>
        <Typography>asdasd</Typography>
      </WrapperContent>
    </Container>
  );
}
