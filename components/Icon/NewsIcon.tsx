import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

const NewsIcon = (props: SvgIconProps) => {
  return (
    <SVGIconBase {...props}>
      <path
        d="M12.75 7.5H14.25M12.75 10.5H14.25M6.75 13.5H14.25M6.75 16.5H14.25M17.25 7.5H20.625C21.246 7.5 21.75 8.004 21.75 8.625V18C21.75 18.5967 21.5129 19.169 21.091 19.591C20.669 20.0129 20.0967 20.25 19.5 20.25M17.25 7.5V18C17.25 18.5967 17.4871 19.169 17.909 19.591C18.331 20.0129 18.9033 20.25 19.5 20.25M17.25 7.5V4.875C17.25 4.254 16.746 3.75 16.125 3.75H4.875C4.254 3.75 3.75 4.254 3.75 4.875V18C3.75 18.5967 3.98705 19.169 4.40901 19.591C4.83097 20.0129 5.40326 20.25 6 20.25H19.5M6.75 7.5H9.75V10.5H6.75V7.5Z"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </SVGIconBase>
  );
};

export default NewsIcon;
