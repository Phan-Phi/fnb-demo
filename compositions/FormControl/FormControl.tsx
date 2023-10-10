import React, { useMemo } from "react";
import { UseControllerReturn } from "react-hook-form";

import { useIntl } from "@/hooks";
import { FormControlBase } from "@/components";
import { FormControlBaseProps } from "@/components/Input/FormControlBase";

type FormControlProps = {
  controlState: any;
  label?: React.ReactNode;
  placeholder?: string;
} & FormControlBaseProps;

export default function FormControl(props: FormControlProps) {
  const {
    FormControlProps,
    FormLabelProps,
    FormHelperTextProps,
    InputProps,
    controlState,
    label,
    placeholder,
  } = props;
  const { messages } = useIntl();

  const { field, fieldState } = controlState as UseControllerReturn;

  const { name, onBlur, onChange, ref, value } = field;
  const { error } = fieldState;

  const renderError = useMemo(() => {
    if (error == undefined) return null;

    if (error.type === "required") {
      return messages["contact.error.required"];
    }
    if (error.type === name) {
      return messages[`contact.error.${name}`];
    }
  }, [error]);

  return (
    <FormControlBase
      FormControlProps={{
        error: !!error,
        ...FormControlProps,
      }}
      FormLabelProps={{
        children: label,
        htmlFor: name,
        ...FormLabelProps,
      }}
      InputProps={{
        placeholder,
        id: name,
        value,
        onChange,
        inputRef: ref,
        onBlur,
        autoComplete: "off",
        ...InputProps,
      }}
      FormHelperTextProps={{
        children: error && renderError,
        ...FormHelperTextProps,
      }}
    />
  );
}
