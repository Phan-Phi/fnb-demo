import { useToggle } from "react-use";
import React, { useCallback } from "react";
import { UseControllerReturn } from "react-hook-form";

import useSWR from "swr";
import { get } from "lodash";

import {
  InputProps,
  Autocomplete,
  FormLabelProps,
  FormControlProps,
  FormHelperTextProps,
} from "@mui/material";
import InputForAutocomplete from "./InputForAutoComplete";

import { useIntl } from "@/hooks";

import { PROVINCES } from "@/__generated__";
import { PROVINCES_END_POINT } from "@/__generated__/END_POINT";

interface ProvinceProps {
  controlState?: any;
  onChange?: (value: any) => void;
  InputProps?: InputProps;
  FormLabelProps?: FormLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  readOnly?: boolean;
  disabled?: boolean;
}

const Province = (props: ProvinceProps) => {
  const { messages } = useIntl();

  const {
    controlState,
    FormControlProps,
    FormHelperTextProps,
    FormLabelProps,
    InputProps: OuterInputProps,
    onChange: onChangeOuter,
    readOnly,
    disabled,
  } = props;

  const { field, fieldState } = controlState as UseControllerReturn;
  const { onChange, ref, value } = field;
  const { error } = fieldState;

  const [isShown, toggleIsShown] = useToggle(false);

  const url = `${PROVINCES_END_POINT}?limit=1000`;

  const { data } = useSWR<PROVINCES>(() => {
    if (isShown) return url;

    return url;
  });

  const onChangeHandler = useCallback(
    (_: any, value: any) => {
      onChange(value);
      onChangeOuter && onChangeOuter(value);
    },
    [onChange, onChangeOuter]
  );

  const dataProvinces = get(data, "items");

  return (
    <Autocomplete
      readOnly={readOnly}
      disabled={disabled}
      options={dataProvinces ?? []}
      open={isShown}
      value={value}
      onChange={onChangeHandler}
      onOpen={() => toggleIsShown(true)}
      onClose={() => toggleIsShown(false)}
      renderInput={(props) => {
        return (
          <InputForAutocomplete
            FormControlProps={FormControlProps}
            {...props}
            label={messages["form.city"] as string}
            error={!!error}
            errorMessage={error && messages["contact.error.required"]}
            FormLabelProps={FormLabelProps}
            FormHelperTextProps={FormHelperTextProps}
            InputProps={{ ...props.InputProps, ...OuterInputProps, inputRef: ref }}
          />
        );
      }}
      loading={!data && isShown}
      getOptionLabel={(option) => option["name"]}
    />
  );
};
export default Province;
