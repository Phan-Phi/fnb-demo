import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

const PhonePrimaryIcon = (props: SvgIconProps) => {
  return (
    <SVGIconBase sx={{ fill: "transparent" }} {...props}>
      <path
        d="M2.25 7.70618C2.25 15.9904 8.96573 22.7062 17.25 22.7062H19.5C20.7426 22.7062 21.75 21.6988 21.75 20.4562V19.0846C21.75 18.5683 21.3987 18.1183 20.8979 17.9931L16.4747 16.8873C16.0355 16.7776 15.5734 16.9416 15.3018 17.3038L14.3316 18.5974C14.05 18.9728 13.563 19.1388 13.1223 18.9774C9.81539 17.766 7.19015 15.1408 5.97876 11.8338C5.81734 11.3932 5.98336 10.9062 6.3588 10.6246L7.65242 9.65436C8.01453 9.38278 8.17861 8.92063 8.06883 8.48151L6.96304 4.05832C6.83783 3.55751 6.38785 3.20618 5.87163 3.20618H4.5C3.25736 3.20618 2.25 4.21354 2.25 5.45618V7.70618Z"
        stroke="#262626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIconBase>
  );
};

export default PhonePrimaryIcon;
