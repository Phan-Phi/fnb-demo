import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

export default function TimeIcon(props: SvgIconProps) {
  return (
    <SVGIconBase {...props}>
      <path
        d="M12 6.95618V12.9562H16.5M21 12.9562C21 17.9267 16.9706 21.9562 12 21.9562C7.02944 21.9562 3 17.9267 3 12.9562C3 7.98561 7.02944 3.95618 12 3.95618C16.9706 3.95618 21 7.98561 21 12.9562Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIconBase>
  );
}
