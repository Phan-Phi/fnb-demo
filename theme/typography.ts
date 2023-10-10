import {
  SVNPoppins,
  RobotoFont,
  RobotoSlabFont,
  InterFont,
  NunitoSansFont,
} from "@/libs";
import { TypographyOptions } from "@mui/material/styles/createTypography";

type OmitProperties = "fontSize" | "fontWeight" | "lineHeight" | "letterSpacing";

const createTypographyProperties = (
  props: {
    fontSize: string | number;
    fontWeight: string | number;
    lineHeight: string | number;
    letterSpacing?: string | number;
    color?: string;
  } & Omit<React.CSSProperties, OmitProperties>
) => {
  const { fontSize, fontWeight, letterSpacing, lineHeight, ...restProps } = props;

  return {
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    ...restProps,
  };
};

export const typographyTheme: TypographyOptions = {
  fontFamily: NunitoSansFont.style.fontFamily,
  h_large: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "52px",
    lineHeight: "56px",
  }),
  h_small: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "44px",
    lineHeight: "48px",
  }),
  h1: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "40px",
    lineHeight: "48px",
  }),
  h2: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "36px",
    lineHeight: "44px",
  }),
  h3: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "32px",
    lineHeight: "40px",
  }),
  h4: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "28px",
    lineHeight: "36px",
  }),
  h5: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "32px",
  }),
  h6: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "28px",
  }),

  p_large: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "28px",
  }),
  p_medium: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
  }),
  p_small: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
  }),
  p_xSmall: createTypographyProperties({
    fontFamily: NunitoSansFont.style.fontFamily,
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "20px",
  }),

  RobotoSlab_small: createTypographyProperties({
    fontFamily: RobotoSlabFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "44px",
    lineHeight: "48px",
  }),

  RobotoSlab_xSmall: createTypographyProperties({
    fontFamily: RobotoSlabFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "52px",
    lineHeight: "83px",
  }),

  Roboto: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
  }),

  Inter_large: createTypographyProperties({
    fontFamily: InterFont.style.fontFamily,
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
  }),

  Inter_medium: createTypographyProperties({
    fontFamily: InterFont.style.fontFamily,
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "28px",
  }),

  SVNPoppins: createTypographyProperties({
    fontFamily: SVNPoppins.style.fontFamily,
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.48px",
  }),
};
