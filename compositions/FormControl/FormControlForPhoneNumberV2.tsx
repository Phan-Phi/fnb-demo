import { useRef } from "react";
import { useClickAway } from "react-use";
import { UseControllerReturn } from "react-hook-form";

import {
  Box,
  styled,
  FormLabel,
  InputProps,
  FormControl,
  FormHelperText,
  FormLabelProps,
  FormControlProps,
  FormHelperTextProps,
} from "@mui/material";
import { MuiTelInput, MuiTelInputProps } from "mui-tel-input";

import { useIntl, useToggle } from "@/hooks";

type FormControlForPhoneNumberV2Props = {
  controlState: any;
  label?: string;
  InputProps?: Omit<InputProps, "inputComponent" | "onChange" | "value">;
  FormLabelProps?: FormLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  MuiTelInputProps?: MuiTelInputProps;
};

const FormControlForPhoneNumberV2 = (props: FormControlForPhoneNumberV2Props) => {
  const {
    label,
    InputProps,
    controlState,
    FormLabelProps,
    FormControlProps,
    MuiTelInputProps,
    FormHelperTextProps,
  } = props;
  const { messages } = useIntl();

  const { field, fieldState } = controlState as UseControllerReturn;

  const { name, onChange, ref, value } = field;
  const { error } = fieldState;

  const wrapperRef = useRef(null);
  const { on: isActive, toggleOn: OnActive, toggleOff: OffActive } = useToggle();

  useClickAway(wrapperRef, () => {
    OffActive();
  });

  return (
    <Box ref={wrapperRef} onClick={OnActive}>
      <FormControl error={!!error} {...FormControlProps}>
        <StyledLabel htmlFor={name} isActive={isActive} {...FormLabelProps}>
          {label || messages["form.phoneNumber"]}
        </StyledLabel>

        <StyledMuiTelInput
          id={name}
          inputRef={ref}
          value={value}
          onChange={onChange}
          autoComplete="off"
          defaultCountry="VN"
          InputProps={InputProps}
          {...MuiTelInputProps}
        />

        <FormHelperText {...FormHelperTextProps}>
          {error && messages["contact.error.phone_number"]}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

const StyledMuiTelInput = styled(MuiTelInput)(() => {
  return {
    ["& .MuiInputBase-root"]: {
      borderRadius: 6,
      height: "44.6px",
      padding: "10px 12px",

      ["& .MuiOutlinedInput-notchedOutline"]: {
        borderWidth: 0.3,
        borderColor: "transparent !important",
      },
    },
  };
});

const StyledLabel = styled(FormLabel, {
  shouldForwardProp: (propName) => propName !== "isActive",
})<{ isActive: boolean }>(({ isActive, theme }) => {
  return {
    color: isActive ? `${theme.palette.primary.main} !important` : "none",
  };
});

export default FormControlForPhoneNumberV2;
