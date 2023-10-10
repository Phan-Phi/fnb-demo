import classNames from "classnames";
import React, { useCallback } from "react";
import NumberFormat, { NumberFormatProps, NumberFormatValues } from "react-number-format";

import { styled } from "@mui/material";

import SVG from "../SVG";
import Box from "../Box/Box";

type OmitKey = "onValueChange" | "customInput";

interface CounterInputProps extends Omit<NumberFormatProps, OmitKey> {
  onValueChange?: (value: number) => void;
}

const CounterInput = (props: CounterInputProps) => {
  const { value, onValueChange, ...restProps } = props;

  const onValueChangeHandler = useCallback(
    (e: NumberFormatValues) => {
      const { floatValue } = e;
      onValueChange && onValueChange(floatValue || 1);
    },
    [onValueChange]
  );

  const onIncreaseNumberHandler = useCallback(() => {
    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) return;

    onValueChange && onValueChange(parsedValue + 1);
  }, [onValueChange, value]);

  const onDecreaseNumberHandler = useCallback(() => {
    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) return;

    if (parsedValue <= 1) return;

    onValueChange && onValueChange(parsedValue - 1);
  }, [value, onValueChange]);

  const isAllowedHandler = useCallback((values: NumberFormatValues): boolean => {
    const { floatValue, value } = values;
    if (value.match(/[\.,]/g)) return false;
    if (floatValue == undefined) return true;
    if (floatValue === 0) return false;

    return true;
  }, []);

  return (
    <StyledBox className="counter-input">
      <StyledWrapperSVG
        className={classNames([
          "counter-input__decrease",
          {
            disabled: value == undefined || Number(value) <= 1,
          },
        ])}
        onClick={onDecreaseNumberHandler}
      >
        <StyledMinus src="/svg/minus.svg" />
      </StyledWrapperSVG>

      <StyledNumberFormat
        className="input"
        value={value}
        allowNegative={false}
        thousandSeparator
        isAllowed={isAllowedHandler}
        onValueChange={onValueChangeHandler}
        allowLeadingZeros={false}
        {...restProps}
      />

      <StyledWrapperSVG
        className="counter-input__increase"
        onClick={onIncreaseNumberHandler}
      >
        <StyledPlus src="/svg/plus.svg" />
      </StyledWrapperSVG>
    </StyledBox>
  );
};

const StyledBox = styled(Box)(({ theme }) => {
  return {
    borderRadius: 3,
    borderWidth: 0.3,
    borderStyle: "solid",
    borderColor: theme.palette.neutral["neutral700"],

    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    height: 40,
    overflow: "hidden",
  };
});

const StyledWrapperSVG = styled(Box)(({ theme }) => {
  return {
    height: 40,
    padding: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    ["&.counter-input__decrease:active"]: {
      backgroundColor: theme.palette.neutral["neutral700"],
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3,
    },

    ["&.counter-input__increase:active"]: {
      backgroundColor: theme.palette.neutral["neutral700"],
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
    },

    "&.counter-input__decrease.disabled": {
      pointerEvents: "none",
      opacity: 0.7,
    },
  };
});

const StyledMinus = styled(SVG)(({ theme }) => {
  return {
    marginTop: -8,
    "& path": {
      fill:
        theme.palette.mode === "dark"
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
  };
});

const StyledPlus = styled(SVG)(({ theme }) => {
  return {
    "& path": {
      fill:
        theme.palette.mode === "dark"
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
  };
});

const StyledNumberFormat = styled(NumberFormat)(({ theme }) => {
  return {
    padding: 10,
    width: 45,
    height: 38,
    textAlign: "center",

    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,

    borderStyle: "solid",
    borderColor: theme.palette.neutral["neutral700"],

    outline: "none",
    color: theme.palette.text.primary,
    backgroundColor: "transparent",

    ["&.input:focus"]: {
      border: `1px solid ${theme.palette.primary.main}`,

      fontSize: "14px !important",
    },

    ["& input"]: {
      padding: 0,
      color: theme.palette.text.primary,
      textAlign: "center",
    },
  };
});

export default CounterInput;
