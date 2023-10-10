import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export type { SvgIconProps };

const SVGIconBase = (props: SvgIconProps) => {
  return <SvgIcon {...props} />;
};

export default SVGIconBase;
