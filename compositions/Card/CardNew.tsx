import { useRouter } from "next/router";
import { useMeasure } from "react-use";
import { useEffect, useState } from "react";
import { Typography, styled, useTheme } from "@mui/material";

import { NewsPage } from "@/interfaces";
import { RATIO_NEWS } from "@/constants";
import { useIntl, useMedia } from "@/hooks";
import { Box, Ratio, Image, Stack, ArrowRightIcon } from "@/components";
import { formatDate } from "@/libs";

interface WrapperProps {
  heightHover: number;
}

interface Props {
  data: NewsPage;
}

export default function CardNew({ data }: Props) {
  const { query } = useRouter();
  const { isSm_Md, isMdDown } = useMedia();
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  const { thumbnail, title, content, description, id, last_published_at } = data;

  const [state, setState] = useState<string>();
  useEffect(() => {
    if (Number(query.id) === id) {
      setState(isSm_Md ? RATIO_NEWS.tablet : RATIO_NEWS.desktop);
    } else {
    }
  }, [isSm_Md, isMdDown]);

  return (
    <Wrapper heightHover={height}>
      <Ratio ratio={isSm_Md ? RATIO_NEWS.tablet : RATIO_NEWS.desktop}>
        {thumbnail && (
          <Image
            src={thumbnail}
            alt=""
            style={{ borderRadius: "0.5rem", objectFit: "cover" }}
          />
        )}
        <Overlay className="overlay"></Overlay>

        <WrapperContent ref={ref} className="content">
          <Content id={id} content={description} last_published_at={last_published_at} />
        </WrapperContent>

        <Box sx={{ position: "absolute", bottom: "1rem", padding: "0 1rem" }}>
          <Title>{title}</Title>
          <Box className="content2" sx={{ transition: "all .4s ease" }}></Box>
        </Box>
      </Ratio>
    </Wrapper>
  );
}

const Wrapper = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "heightHover";
  },
})<WrapperProps>(({ theme, heightHover }) => {
  return {
    width: "100%",
    overflow: "hidden",
    transition: "all .4s ease",
    // cursor: "pointer",

    "&:hover .overlay": {
      opacity: ".6",
    },

    "&:hover .content2": {
      paddingTop: `${heightHover}px`,
    },

    "&:hover .content": {
      opacity: 1,
    },
  };
});

const Overlay = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    height: "100%",
    width: "100%",
    opacity: ".3",
    transition: ".4s ease",
    backgroundColor: "#242424",
    borderRadius: "0.5rem",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    fontSize: "28px",
    lineHeight: "36px",
    minHeight: 36 * 2,
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: theme.palette.common.white,
  };
});

interface ContentProps {
  id: number;
  content: string;
  last_published_at: string;
}

const Content = ({ id, content, last_published_at }: ContentProps) => {
  const { push } = useRouter();
  const { messages } = useIntl();
  const theme = useTheme();

  return (
    <Box>
      <TimeNews>{formatDate(last_published_at, "dd.MM.yyyy")}</TimeNews>
      <Text variant="p_medium">{content}</Text>
      <SeeMore direction="row" marginTop={1} spacing={1.5}>
        <Typography
          onClick={() => {
            push(`/news/${id}`);
          }}
          color={theme.palette.common.white}
        >
          {messages["news.viewMore"]}
        </Typography>

        <Box
          onClick={() => {
            push(`/news/${id}`);
          }}
        >
          <ArrowRightIcon />
        </Box>
      </SeeMore>
    </Box>
  );
};

const Text = styled(Typography)(({ theme }) => {
  return {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    minHeight: 36 * 2,
    fontWeight: 700,
    color: theme.palette.common.white,
  };
});

const SeeMore = styled(Stack)(({ theme }) => {
  return {
    cursor: "pointer",
  };
});

const WrapperContent = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    bottom: "1rem",
    padding: "0 1rem",
    zIndex: 3,
    opacity: 0,
    transition: "all .4s ease",
  };
});

const TimeNews = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.Inter_large,
    fontSize: "16px",
    lineHeight: "24px",
    color: theme.palette.common.white,
  };
});
