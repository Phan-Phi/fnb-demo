import { get } from "lodash";
import { useMemo } from "react";
import { Box } from "@mui/material";
import YouTube from "react-youtube";
import { useMeasure, useWindowSize } from "react-use";

import { getIdYoutube } from "@/libs";
import { BlockTypeEmbed } from "@/interfaces";

interface Props {
  data: BlockTypeEmbed;
}

const size = 1038 / 625;

export default function VideoYoutube({ data }: Props) {
  const { width: widthWindow } = useWindowSize();
  const [ref, { width: widthMeasure }] = useMeasure<HTMLDivElement>();

  const { width, height, src } = get(data, "value");

  const render = useMemo(() => {
    if (widthMeasure === 0) return;
    if (width === "") {
      return (
        <YouTube
          videoId={getIdYoutube(src) as string}
          opts={{
            width: "100%",
            height: widthMeasure / size,
          }}
        />
      );
    } else {
      return (
        <YouTube
          videoId={getIdYoutube(src) as string}
          opts={{
            width: Number(width) < widthWindow ? width : "100%",
            height: Number(height) < widthWindow ? height : widthMeasure / size,
          }}
        />
      );
    }
  }, [widthMeasure, widthWindow]);

  return <Box ref={ref}>{render}</Box>;
}
