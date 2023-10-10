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
import { transformUrl } from "libs";
import { PROVINCES_DISTRICTS } from "@/__generated__";
import { PROVINCES_DISTRICTS_END_POINT } from "@/__generated__/END_POINT";

interface DistrictProps {
  controlState: any;
  province?: string | number;
  InputProps?: InputProps;
  onChange?: (value: any) => void;
  FormLabelProps?: FormLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  readOnly?: boolean;
  disabled?: boolean;
}
const District = (props: DistrictProps) => {
  const { messages } = useIntl();

  const {
    onChange: onChangeOuter,
    InputProps: OuterInputProps,
    controlState,
    FormControlProps,
    FormHelperTextProps,
    FormLabelProps,
    province,
    readOnly,
    disabled,
  } = props;

  const { field, fieldState } = controlState as UseControllerReturn;
  const { onChange, ref, value } = field;
  const { error } = fieldState;

  const [isShown, toggleIsShown] = useToggle(false);

  const { data } = useSWR<PROVINCES_DISTRICTS>(() => {
    if (isShown && province) {
      return transformUrl(PROVINCES_DISTRICTS_END_POINT, {
        province_code: province,
        limit: 1000,
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

  const dataDistricts = get(data, "items");

  return (
    <Autocomplete
      readOnly={readOnly}
      options={dataDistricts ?? []}
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
            label={messages["form.district"]}
            error={!!error}
            errorMessage={error && messages["contact.error.required"]}
            FormLabelProps={FormLabelProps}
            FormHelperTextProps={FormHelperTextProps}
            InputProps={{
              ...props.InputProps,
              ...OuterInputProps,
              inputRef: ref,
            }}
          />
        );
      }}
      getOptionLabel={(option) => option["name"]}
      // loading={!data && isShown}
      // disabled={!province}
    />
  );
};

export default District;
