import { get } from "lodash";
import { Container, Typography, styled } from "@mui/material";

import { Box, SEO } from "@/components";
import { RenderContent } from "@/compositions";
import { formatDate, getSeoObject } from "@/libs";
import { IPage, responseSchema } from "@/interfaces";
import { NEWS_PAGE_TYPE, NEWS_PAGE_TYPE_ITEM_TYPE } from "@/__generated__";

export type NewsDetailPageProps = IPage<
  [NEWS_PAGE_TYPE_ITEM_TYPE, responseSchema<NEWS_PAGE_TYPE>]
>;

export default function NewsDetail(props: NewsDetailPageProps) {
  const newsDetailData = get(props, "initData[0]");

  const { title, content, meta, last_published_at } = newsDetailData;

  return (
    <Wrapper>
      <SEO {...getSeoObject(meta)} />

      <StyledContainer>
        <Title>{title}</Title>
        <TimeNews>{formatDate(meta.first_published_at, "dd.MM.yyyy")}</TimeNews>

        <WrapperContent>
          <RenderContent data={content} />
        </WrapperContent>
      </StyledContainer>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    padding: "0 1.25rem",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.RobotoSlab_xSmall,
  };
});

const TimeNews = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    fontSize: "24px",
    fontWeight: 600,
  };
});

const WrapperContent = styled(Box)(() => {
  return {
    margin: "80px 0",
  };
});

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    padding: "0 5rem !important",

    [theme.breakpoints.down("lg")]: {
      padding: "0 2.5rem !important",
    },

    [theme.breakpoints.down("md")]: {
      padding: "0 1rem !important",
    },
  };
});

const WrapperHero = styled(Box)(({ theme }) => {
  return {
    "& .MuiBox-root": {
      margin: "0 auto",
    },

    "& .wrapperContent": {
      left: "5rem",
      width: "80%",

      "& .MuiTypography-root": {
        width: "100%",
        textAlign: "left",
      },
    },
    [theme.breakpoints.down("md")]: {
      "& .wrapperContent": {
        left: "1rem",
        width: "80%",
      },
    },
  };
});
