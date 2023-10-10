import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

export default function AddressIcon(props: SvgIconProps) {
  return (
    <SVGIconBase sx={{ fill: "transparent" }} {...props}>
      <path
        d="M3.75 21.9562H20.25M4.5 3.95618H19.5M5.25 3.95618V21.9562M18.75 3.95618V21.9562M9 7.70618H10.5M9 10.7062H10.5M9 13.7062H10.5M13.5 7.70618H15M13.5 10.7062H15M13.5 13.7062H15M9 21.9562V18.5812C9 17.9599 9.50368 17.4562 10.125 17.4562H13.875C14.4963 17.4562 15 17.9599 15 18.5812V21.9562"
        stroke="#262626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIconBase>
  );
}
