import { useMemo } from "react";
import { styled } from "@mui/material";

import { Box } from "@/components";
import RenderHTML from "./RenderHTML";
import { RenderContent } from "@/interfaces";
import VideoYoutube from "../Youtube/VideoYoutube";
import RenderContentLeftRight from "./RenderContentLeftRight";

interface Props {
  data: any;
}

export default function RenderContent({ data }: Props) {
  const render = useMemo(() => {
    if (data === undefined) return;

    return data.map((el: any, idx: number) => {
      const { value, block_type } = el;

      if (block_type === "content") {
        return (
          <Wrapper className="wrapper-render-content" key={idx}>
            <RenderHTML data={value} />
          </Wrapper>
        );
      } else if (block_type === "embed") {
        return (
          <Wrapper key={idx}>
            <VideoYoutube data={el} />
          </Wrapper>
        );
      } else if (block_type === "image_content" || block_type === "content_image") {
        return (
          <Wrapper className="wrapper-render-content" key={idx}>
            <RenderContentLeftRight data={el} />
          </Wrapper>
        );
      }
    });
  }, [data]);

  return <Box>{render}</Box>;
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    margin: "0 0 1.5rem 0",
    [theme.breakpoints.down("md")]: {
      margin: "0 0 1rem 0",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 0 0.8rem 0",
    },
  };
});
