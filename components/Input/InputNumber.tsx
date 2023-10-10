import React from "react";
import NumberFormat, { NumberFormatPropsBase } from "react-number-format";

import {
  InputProps,
  FormControl,
  FormLabelProps,
  FormControlProps,
  FormHelperTextProps,
  FormHelperText,
  FormLabel,
  Input,
} from "@mui/material";

export type InputNumberProps = {
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  InputProps?: Omit<
    InputProps,
    | keyof NumberFormatPropsBase<typeof Input>
    | "customInput"
    | keyof React.ComponentPropsWithRef<"input">
  >;
  FormLabelProps?: FormLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  NumberFormatProps?: Omit<NumberFormatPropsBase<typeof Input>, "customInput">;
};

const InputNumber = (props: InputNumberProps) => {
  const {
    readOnly,
    disabled,
    placeholder,
    InputProps,
    FormLabelProps,
    FormControlProps,
    NumberFormatProps,
    FormHelperTextProps,
  } = props;

  return (
    <FormControl {...FormControlProps}>
      <FormLabel {...FormLabelProps} />
      <NumberFormat
        allowNegative={false}
        thousandSeparator={true}
        customInput={CustomInput}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        {...InputProps}
        {...NumberFormatProps}
      />
      <FormHelperText {...FormHelperTextProps} />
    </FormControl>
  );
};

function CustomInput(props: InputProps) {
  return <Input {...props} />;
}

export default InputNumber;
