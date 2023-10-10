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
import { transformUrl } from "@/libs";
import { PROVINCES_DISTRICTS_WARDS } from "@/__generated__";
import { PROVINCES_DISTRICTS_WARDS_END_POINT } from "@/__generated__/END_POINT";

interface WardProps {
  controlState: any;
  district?: string | number;
  onChange?: (value: any) => void;
  InputProps?: InputProps;
  FormLabelProps?: FormLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  readOnly?: boolean;
  disabled?: boolean;
}

const Ward = (props: WardProps) => {
  const { messages } = useIntl();

  const {
    district,
    controlState,
    FormLabelProps,
    FormControlProps,
    FormHelperTextProps,
    onChange: onChangeOuter,
    InputProps: OuterInputProps,
    readOnly,
    disabled,
  } = props;
  const { field, fieldState } = controlState as UseControllerReturn;
  const { onChange, ref, value } = field;
  const { error } = fieldState;

  const [isShown, toggleIsShown] = useToggle(false);

  const { data } = useSWR<PROVINCES_DISTRICTS_WARDS>(() => {
    if (isShown && district) {
      return transformUrl(PROVINCES_DISTRICTS_WARDS_END_POINT, {
        limit: 1000,
        district_code: district,
      });
    }
  });

  const onChangeHandler = useCallback(
    (_: any, value: any) => {
      onChange(value);
      onChangeOuter && onChangeOuter(value);
    },
    [onChange, onChangeOuter]
  );

  const dataWard = get(data, "items");

  return (
    <Autocomplete
      readOnly={readOnly}
      options={dataWard ?? []}
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
            label={messages["form.ward"] as string}
            error={!!error}
            errorMessage={error && messages["contact.error.required"]}
            FormLabelProps={FormLabelProps}
            FormHelperTextProps={FormHelperTextProps}
            InputProps={{ ...props.InputProps, ...OuterInputProps, inputRef: ref }}
          />
        );
      }}
      getOptionLabel={(option) => option["name"]}
      // disabled={!district}
      // loading={!data && isShown}
    />
  );
};

export default Ward;
