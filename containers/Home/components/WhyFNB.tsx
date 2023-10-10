import { useMemo } from "react";
import { Container, Typography, styled } from "@mui/material";

import { Box, Image, ImageRatio, Stack } from "@/components";

import WrapperContent from "./WrapperContent";

export default function WhyFNB() {
  const renderItem = useMemo(() => {}, []);

  return (
    <Container>
      <WrapperContent title="">
        <WrapperText>
          <Title variant="SVNPoppins">Tại sao chọn FNB?</Title>
          <Text variant="p_large">
            Luxury goods straight from the same manufacturers as your favorite brands.
          </Text>
        </WrapperText>

        <Stack direction="row" spacing="6rem">
          <WrapperItem>
            <Box position="relative" width={120} height={120}>
              <Image src="/image/cube.png" alt="" />
            </Box>
            <TitleItem variant="Inter_medium">Lorem Ipsum</TitleItem>
            <TextItem>
              It is a long established fact that a reader will be distracted.
            </TextItem>
          </WrapperItem>

          <WrapperItem>
            <Box position="relative" width={120} height={120}>
              <Image src="/image/cube.png" alt="" />
            </Box>
            <TitleItem variant="Inter_medium">Lorem Ipsum</TitleItem>
            <TextItem>
              It is a long established fact that a reader will be distracted.
            </TextItem>
          </WrapperItem>

          <WrapperItem>
            <Box position="relative" width={120} height={120}>
              <Image src="/image/cube.png" alt="" />
            </Box>
            <TitleItem variant="Inter_medium">Lorem Ipsum</TitleItem>
            <TextItem>
              It is a long established fact that a reader will be distracted.
            </TextItem>
          </WrapperItem>
        </Stack>
      </WrapperContent>
    </Container>
  );
}

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.default,
  };
});

const WrapperText = styled(Box)(({ theme }) => {
  return {
    textAlign: "center",
    marginBottom: "2.5rem",
  };
});

const WrapperItem = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center !important",
    flexDirection: "column",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {};
});
const Text = styled(Typography)(({ theme }) => {
  return {};
});

const TitleItem = styled(Typography)(({ theme }) => {
  return {
    padding: "1rem 0",
  };
});
const TextItem = styled(Typography)(({ theme }) => {
  return {
    textAlign: "center",
  };
});
