import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

const HomeIcon = (props: SvgIconProps) => {
  return (
    <SVGIconBase {...props}>
      <path
        fill="none"
        d="M2.75 11.9991L11.704 3.04409C12.144 2.60509 12.856 2.60509 13.295 3.04409L22.25 11.9991M5 9.74909V19.8741C5 20.4951 5.504 20.9991 6.125 20.9991H10.25V16.1241C10.25 15.5031 10.754 14.9991 11.375 14.9991H13.625C14.246 14.9991 14.75 15.5031 14.75 16.1241V20.9991H18.875C19.496 20.9991 20 20.4951 20 19.8741V9.74909M8.75 20.9991H17"
        // stroke="#991B1F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </SVGIconBase>
  );
};

export default HomeIcon;
