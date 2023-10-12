import { useMemo } from "react";
import { Container, Typography, styled } from "@mui/material";

import { Box, Image, ImageRatio, Stack } from "@/components";

import WrapperContent from "./WrapperContent";
import { HOME_PAGE_TYPE_ITEM_TYPE } from "@/__generated__";

interface Props {
  // data: HOME_PAGE_TYPE_ITEM_TYPE[];
  data: any;
}

export default function WhyFNB({ data }: Props) {
  const {
    unique_selling_point_title,
    unique_selling_point_subtitle,
    unique_selling_point_images,
  } = data;

  const renderItem = useMemo(() => {
    return unique_selling_point_images.map((el: any, idx: number) => {
      const { value } = el;

      return (
        <WrapperItem key={idx}>
          <Box position="relative" width={120} height={120}>
            <Image src={value.image} alt="" />
          </Box>
          <TitleItem variant="Inter_medium">{value.title}</TitleItem>
          <TextItem>{value.subtitle}</TextItem>
        </WrapperItem>
      );
    });
  }, [unique_selling_point_images]);

  return (
    <Container>
      <WrapperContent title="">
        <WrapperText>
          <Title variant="SVNPoppins">{unique_selling_point_title}</Title>
          <Text variant="p_large">{unique_selling_point_subtitle}</Text>
        </WrapperText>

        <Stack direction="row" spacing="6rem" justifyContent="center">
          {renderItem}
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
