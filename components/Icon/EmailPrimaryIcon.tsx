import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

const EmailPrimaryIcon = (props: SvgIconProps) => {
  return (
    <SVGIconBase sx={{ fill: "transparent" }} {...props}>
      <path
        d="M21.75 7.70618V18.2062C21.75 19.4488 20.7426 20.4562 19.5 20.4562H4.5C3.25736 20.4562 2.25 19.4488 2.25 18.2062V7.70618M21.75 7.70618C21.75 6.46354 20.7426 5.45618 19.5 5.45618H4.5C3.25736 5.45618 2.25 6.46354 2.25 7.70618M21.75 7.70618V7.94889C21.75 8.73022 21.3447 9.45562 20.6792 9.86512L13.1792 14.4805C12.4561 14.9255 11.5439 14.9255 10.8208 14.4805L3.32078 9.86512C2.65535 9.45562 2.25 8.73022 2.25 7.94889V7.70618"
        stroke="#262626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIconBase>
  );
};

export default EmailPrimaryIcon;
