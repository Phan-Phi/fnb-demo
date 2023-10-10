import React, { useCallback } from "react";
import { useMountedState } from "react-use";
import { Controller, useForm } from "react-hook-form";

import { Box, Stack } from "@mui/material";

import { LabelCustom, LoadingButton } from "@/components";
import { FormControl, FormControlForPhoneNumber } from "@/compositions";

import axios from "axios.config";
import { useIntl, useNotification } from "@/hooks";
import { CONTACTS_END_POINT } from "@/__generated__";
import { ContactSchema, ContactSchemaProps, DefaultContactFormState } from "@/yups";

export default function FormContact() {
  const { messages } = useIntl();
  const isMounted = useMountedState();

  const { loading, setLoading, enqueueSnackbarWithError, enqueueSnackbarWithSuccess } =
    useNotification();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: DefaultContactFormState(),
    resolver: ContactSchema(),
  });

  const onSubmit = useCallback(async (values: ContactSchemaProps) => {
    try {
      setLoading(true);

      const { email, content, name, phone_number, social_info } = values;

      const data = {
        email,
        name,
        phone_number,
        content,
        social_info,
      };

      await axios.post(CONTACTS_END_POINT, data);

      reset(DefaultContactFormState, {
        keepDirty: false,
      });

      enqueueSnackbarWithSuccess(messages["form.messagesSuccess"]);
    } catch (err) {
      enqueueSnackbarWithError(err);
    } finally {
      if (isMounted()) {
        setLoading(false);
      }
    }
  }, []);

  return (
    <Box component="form">
      <Stack spacing="16px">
        <Controller
          name="name"
          control={control}
          render={(props) => {
            return <FormControl label="Tên" controlState={props} />;
          }}
        />

        <Controller
          name="phone_number"
          control={control}
          render={(props) => {
            return (
              <FormControlForPhoneNumber controlState={props} label="Số Điện Thoại" />
            );
          }}
        />

        <Controller
          name="email"
          control={control}
          render={(props) => {
            return <FormControl controlState={props} label="Email" />;
          }}
        />

        <Controller
          name="social_info"
          control={control}
          render={(props) => {
            return (
              <FormControl
                controlState={props}
                label={
                  <LabelCustom
                    htmlFor="social_info"
                    message="Facebook/Zalo/TikTok/Viber/WhatsApp"
                  />
                }
              />
            );
          }}
        />

        <Controller
          control={control}
          name="content"
          render={(props) => {
            return (
              <FormControl
                controlState={props}
                label="Nội Dung"
                InputProps={{
                  multiline: true,
                  rows: 8,
                }}
              />
            );
          }}
        />

        <LoadingButton
          loading={loading}
          buttonProps={{
            type: "submit",
            onClick: handleSubmit(onSubmit),
          }}
        />
      </Stack>
    </Box>
  );
}
