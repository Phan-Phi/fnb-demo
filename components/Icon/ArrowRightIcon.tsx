import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

const ArrowRightIcon = (props: SvgIconProps) => {
  return (
    <SVGIconBase {...props} viewBox="0 0 19.5 9">
      <path
        fill="white"
        className="cls-1"
        d="M21.69,5.64a.78.78,0,0,0-.16-.24L17.78,1.65a.75.75,0,0,0-1.06,1.06l2.47,2.47H3a.75.75,0,0,0,0,1.5H19.19L16.72,9.15a.75.75,0,0,0,0,1.06.75.75,0,0,0,1.06,0l3.75-3.75a.78.78,0,0,0,.16-.24A.73.73,0,0,0,21.69,5.64Z"
        transform="translate(-2.25 -1.43)"
      ></path>
    </SVGIconBase>
  );
};

export default ArrowRightIcon;
