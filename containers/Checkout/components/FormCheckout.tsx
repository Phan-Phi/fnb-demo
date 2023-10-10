import React from "react";
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { useIntl } from "@/hooks";
import { Box, styled } from "@mui/material";

import {
  Ward,
  District,
  Province,
  FormControl,
  FormControlForPhoneNumber,
} from "@/compositions";
import { LabelCustom } from "@/components";
import { CheckoutSchemaProps } from "@/yups";

type FormCheckoutProps = {
  control: Control<CheckoutSchemaProps>;
  setValue: UseFormSetValue<CheckoutSchemaProps>;
  watch: UseFormWatch<CheckoutSchemaProps>;
};

export default function FormCheckout(props: FormCheckoutProps) {
  const { messages } = useIntl();

  const { control, setValue, watch } = props;

  return (
    <StyledForm component="form">
      <Controller
        name="name"
        control={control}
        render={(props) => {
          return <FormControl controlState={props} label={messages["form.name"]} />;
        }}
      />

      <Controller
        name="phone_number"
        control={control}
        render={(props) => {
          return (
            <FormControlForPhoneNumber
              controlState={props}
              InputProps={{ autoComplete: "off" }}
            />
          );
        }}
      />

      <Controller
        name="email"
        control={control}
        render={(props) => {
          return (
            <FormControl
              controlState={props}
              InputProps={{
                autoCapitalize: "none",
              }}
              label={messages["form.email"]}
            />
          );
        }}
      />

      <Controller
        name="address"
        control={control}
        render={(props) => {
          return <FormControl controlState={props} label={messages["form.address"]} />;
        }}
      />

      <Box sx={{ width: "100%" }}>
        <Controller
          name="province"
          control={control}
          render={(props) => {
            return (
              <Province
                controlState={props}
                InputProps={{
                  fullWidth: true,
                }}
                onChange={() => {
                  setValue("district", null);
                  setValue("ward", null);
                }}
              />
            );
          }}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Controller
          name="district"
          control={control}
          render={(props) => {
            const provinceTuple = watch("province");
            return (
              <District
                controlState={props}
                province={provinceTuple ? provinceTuple?.code : undefined}
                onChange={() => {
                  setValue("ward", null);
                }}
              />
            );
          }}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Controller
          name="ward"
          control={control}
          render={(props) => {
            const districtTuple = watch("district");

            return (
              <Ward
                controlState={props}
                district={districtTuple ? districtTuple["code"] : undefined}
              />
            );
          }}
        />
      </Box>

      <Controller
        name="note"
        control={control}
        render={(props) => {
          return (
            <FormControl
              controlState={props}
              label={<LabelCustom message={messages["form.delivery"]} htmlFor="note" />}
              InputProps={{
                multiline: true,
                rows: 8,
              }}
            />
          );
        }}
      />
    </StyledForm>
  );
}

const StyledForm = styled(Box)(() => {
  return {
    gap: 16,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
});
