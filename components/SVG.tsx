import React from "react";
import { ReactSVG } from "react-svg";
import { Skeleton } from "@mui/material";

export interface SVGProps extends React.ComponentPropsWithoutRef<typeof ReactSVG> {}

const SVG = (props: SVGProps) => {
  return (
    <ReactSVG
      className="svg"
      loading={() => {
        return (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={props.width ?? 50}
            height={props.height ?? 50}
          />
        );
      }}
      {...props}
    />
  );
};

export default SVG;
