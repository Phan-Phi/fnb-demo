import React from "react";
import NumberFormatCustom from "./NumberFormat";
import { Stack, Typography, TypographyProps, styled } from "@mui/material";

type VNDCurrencyProps = {
  className?: string;
  value: any;
  fontSize?: string | number;
  lineHeight?: string;
  colorPrimary?: boolean;
  fontWeight?: string | number;
};

interface StyledSuffixExtends extends TypographyProps {
  objectStyles: {
    fontSize?: string | number;
    lineHeight?: string;
    colorPrimary?: boolean;
    fontWeight?: string | number;
  };
}

const VNDCurrency = (props: VNDCurrencyProps) => {
  const {
    className,
    value,
    fontSize = "12px",
    lineHeight = "20px",
    colorPrimary = false,
    fontWeight = "400",
  } = props;

  const objectStyles = {
    fontSize: fontSize,
    lineHeight: lineHeight,
    colorPrimary: colorPrimary,
    fontWeight: fontWeight,
  };

  return (
    <StyledWrapper>
      <StyledNumberFormatCustom
        thousandSeparator="."
        decimalSeparator=","
        className={className}
        value={value}
        suffix=" VNĐ"
      />
      {/* <StyledSuffix className="suffix" objectStyles={objectStyles}>
        VNĐ
      </StyledSuffix> */}
    </StyledWrapper>
  );
};

export default VNDCurrency;

const StyledWrapper = styled(Stack)(() => {
  return {
    gap: 4,
    alignItems: "baseline",
    flexDirection: "row",
  };
});

const StyledNumberFormatCustom = styled(NumberFormatCustom)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: "28px",
    letterSpacing: "-0.4px",
    color: theme.palette.text.primary,
  };
});

const StyledSuffix = styled(Typography, {
  shouldForwardProp: (propName) => propName !== "objectStyles",
})<StyledSuffixExtends>(({ theme, objectStyles }) => {
  const { fontSize, lineHeight, colorPrimary, fontWeight } = objectStyles;

  return {
    ...theme.typography.SVNPoppins,
    color: theme.palette.text.primary,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: "28px",
    letterSpacing: "-0.4px",
    // fontSize: fontSize,
    // lineHeight: lineHeight,
    // fontWeight: fontWeight,

    ...(colorPrimary && {
      color: theme.palette.primary.main,
    }),
  };
});
