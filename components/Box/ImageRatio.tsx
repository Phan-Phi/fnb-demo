import { split } from "lodash";
import { forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";

import Image, { ImageProps } from "../Image";

interface ImageRatioProps {
  ratio: string;
  boxProps?: BoxProps;
  imageProps: ImageProps;
}

const ImageRatio = forwardRef<HTMLDivElement | undefined, ImageRatioProps>(
  function ImageRatio(props, ref) {
    const { ratio, boxProps, imageProps } = props;
    const splitRatio = split(ratio, "/");

    return (
      <Box
        {...boxProps}
        ref={ref}
        position="relative"
        paddingBottom={`calc(${splitRatio[1]} / ${splitRatio[0]} * 100%)`}
        className="imageRatio"
      >
        <Image {...imageProps} alt={imageProps.alt || ""} />
      </Box>
    );
  }
);

export default ImageRatio;

// export default function ImageRatio(props: Props) {
//   const { ratio, boxProps, imageProps } = props;
//   const splitRatio = split(ratio, "/");

//   return (
//     <Box
//       {...boxProps}
//       position="relative"
//       paddingBottom={`calc(${splitRatio[1]} / ${splitRatio[0]} * 100%)`}
//       className="imageRatio"
//     >
//       <Image {...imageProps} />
//     </Box>
//   );
// }
