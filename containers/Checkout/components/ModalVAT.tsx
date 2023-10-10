import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

import { Dialog, styled, Typography, Stack, Button } from "@mui/material";

import { FormControl, FormControlForPhoneNumber } from "@/compositions";

import { useIntl } from "@/hooks";
import { COMPONENT_STATE } from "@/configuration";
import { CARD_PRODUCT_BOX_SHADOW } from "@/constants";
import { DefaultVATFormState, VATSchema, VATSchemaProps } from "@/yups";

type ModalVATProps = {
  open: boolean;
  onClose: () => void;
  setDataVAT: React.Dispatch<React.SetStateAction<VATSchemaProps[]>>;
  setCheckVAT: (b: boolean) => void;
};

export default function ModalVAT(props: ModalVATProps) {
  const { messages } = useIntl();

  const { open, onClose, setDataVAT, setCheckVAT } = props;

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: VATSchema(),
    defaultValues: DefaultVATFormState(),
  });

  const handleConfirm = useCallback((values: VATSchemaProps) => {
    setDataVAT([values]);
    setCheckVAT(true);
    onClose();
  }, []);

  const handleCancel = useCallback(() => {
    setDataVAT([]);
    setCheckVAT(false);
    onClose();
    reset(DefaultVATFormState, { keepDirty: false });
  }, []);

  return (
    <StyledModal open={open} onClose={onClose} scroll="body" disableScrollLock={true}>
      <StyledTitle>{messages["order.einvoiceInfor"]}</StyledTitle>

      <StyledForm>
        <Controller
          name="name"
          control={control}
          render={(props) => {
            return <FormControl controlState={props} label={messages["form.vat.name"]} />;
          }}
        />

        <Controller
          name="phone_number"
          control={control}
          render={(props) => {
            return (
              <FormControlForPhoneNumber
                InputProps={{ autoComplete: "off" }}
                controlState={props}
              />
            );
          }}
        />

        <Controller
          name="companyName"
          control={control}
          render={(props) => {
            return (
              <FormControl
                controlState={props}
                label={messages["form.vat.companyName"]}
              />
            );
          }}
        />

        <Controller
          name="tax_code"
          control={control}
          render={(props) => {
            return (
              <FormControl
                controlState={props}
                label={messages["form.vat.companyTaxCode"]}
              />
            );
          }}
        />

        <Controller
          name="address"
          control={control}
          render={(props) => {
            return (
              <FormControl
                controlState={props}
                label={messages["form.vat.companyAddress"]}
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
                label={messages["form.vat.receivedEmail"]}
              />
            );
          }}
        />
      </StyledForm>

      <StyledWrapperButton>
        <StyledButtonCancel onClick={handleCancel}>
          {messages["button.cancel"]}
        </StyledButtonCancel>

        <StyledButtonConfirm
          type="submit"
          onClick={handleSubmit(handleConfirm)}
          disabled={!isValid ? true : false}
        >
          {messages["button.confirm"]}
        </StyledButtonConfirm>
      </StyledWrapperButton>
    </StyledModal>
  );
}

const StyledModal = styled(Dialog)(({ theme }) => {
  return {
    "& .MuiDialog-paper": {
      padding: 40,
      borderRadius: 8,
      minWidth: "40vw",

      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.common.black
          : theme.palette.common.white,
      boxShadow: CARD_PRODUCT_BOX_SHADOW,

      [theme.breakpoints.down("md")]: {
        minWidth: "80vw",
      },

      [theme.breakpoints.down("sm")]: {
        minWidth: "80vw",
        padding: "40px 16px",
      },
    },
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    fontSize: 24,
    fontWeight: 700,
    lineHeight: "32px",
    letterSpacing: "-0.48px",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
  };
});

const StyledForm = styled(Stack)(() => {
  return {
    gap: 8,
    margin: "24px 0",
  };
});

const StyledWrapperButton = styled(Stack)(() => {
  return {
    gap: 20,
    width: "100%",
    flexDirection: "row",
  };
});

const StyledButtonConfirm = styled(Button)(({ theme }) => {
  return {
    width: "50%",
    textTransform: "capitalize",

    [COMPONENT_STATE.disabled]: {
      color: theme.palette.common.black,
      opacity: 0.5,
    },
  };
});

const StyledButtonCancel = styled(Button)(({ theme }) => {
  return {
    width: "50%",
    textTransform: "capitalize",
  };
});
