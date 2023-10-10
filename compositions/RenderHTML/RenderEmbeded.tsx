import { Box } from "@mui/material";
import { useMeasure } from "react-use";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { extract, VideoTypeData } from "oembed-parser";

import { useMedia } from "hooks/useMedia";

interface RenderEmbededProps {
  width?: string;
  height?: string;
  src: string;
}

const RenderEmbeded = (props: RenderEmbededProps) => {
  const { src } = props;
  const { isMdDown } = useMedia();

  const [data, setData] = useState<VideoTypeData>();
  const [ref, { width: containerWidth }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    extract(src)
      .then((oembed) => {
        setData(oembed as VideoTypeData);
      })
      .catch(() => {
        //
      });
  }, [src]);

  if (data == undefined) return null;

  const { width: videoWidth, height: videoHeight } = data;
  const VIDEO_RATIO = videoWidth / videoHeight;

  const defaultWidth = containerWidth < 500 ? containerWidth : 500;

  const frameWidth = parseInt(props.width || "0") || defaultWidth;

  const finalWidth =
    isMdDown || containerWidth < frameWidth ? containerWidth : frameWidth;

  const finalHeight = finalWidth / VIDEO_RATIO;

  return (
    <Box
      ref={ref}
      sx={{
        ["& iframe"]: {
          width: finalWidth,
          height: finalHeight,
        },
      }}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data.html, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
        }),
      }}
    />
  );
};

export default RenderEmbeded;
