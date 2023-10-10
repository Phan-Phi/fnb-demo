import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

const ExpandMoreIcon = (props: SvgIconProps) => {
  return (
    <SVGIconBase {...props}>
      <path
        d="M9.75 4.125L6 7.875L2.25 4.125"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIconBase>
  );
};

export default ExpandMoreIcon;
