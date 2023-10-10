import { forwardRef } from "react";
import { styled } from "@mui/material";
import NextImage, { ImageProps as NextImageProps } from "next/image";

type OmitKey = "alt";

const defaultBlurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export interface ImageProps extends Omit<NextImageProps, OmitKey> {
  alt?: string;
}

const Image = forwardRef<any, ImageProps>(function Image(props: ImageProps, ref) {
  const { alt, fill = true, width, height, ...restProps } = props;

  return (
    <StyledImage
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : width}
      blurDataURL={defaultBlurDataURL}
      alt={alt || ""}
      ref={ref}
      {...restProps}
    />
  );
});

const StyledImage = styled(NextImage)({
  objectFit: "contain",
});

export default Image;
