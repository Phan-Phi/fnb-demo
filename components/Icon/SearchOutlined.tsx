import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

const SearchOutlined = (props: SvgIconProps) => {
  return (
    <SVGIconBase {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.906 16.32a8 8 0 111.414-1.414l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387zM16 10a6 6 0 11-12 0 6 6 0 0112 0z"
      />
    </SVGIconBase>
  );
};

export default SearchOutlined;
