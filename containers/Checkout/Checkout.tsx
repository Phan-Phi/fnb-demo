import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMountedState } from "react-use";
import React, { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { mutate } from "swr";
import { clone } from "lodash";
import axios from "axios.config";
import { Container, Grid, Stack, Typography, styled } from "@mui/material";

import ModalVAT from "./components/ModalVAT";
import CheckVAT from "./components/CheckVAT";
import FormCheckout from "./components/FormCheckout";
import OrderSection from "./components/OrderSection";
import { LoadingButton, SEO, Spacing, Title, VNDCurrency } from "@/components";

import { getSeoObject } from "@/libs";
import { useCart, useIntl, useNotification, useToggle } from "@/hooks";
import { CART_END_POINT, CART_ITEMS_END_POINT } from "@/__generated__";

import {
  CheckoutSchema,
  VATSchemaProps,
  CheckoutSchemaProps,
  DefaultCheckoutFormState,
} from "@/yups";

export default function Checkout() {
  const router = useRouter();
  const { cartKey } = useCart();
  const { messages } = useIntl();
  const isMounted = useMountedState();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [checkVAT, setCheckVAT] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataVAT, setDataVAT] = useState<VATSchemaProps[]>([]);
  const { on: openVAT, toggleOff: onCloseVAT, toggleOn: onOpenVAT } = useToggle();

  const { loading, setLoading, enqueueSnackbarWithError, enqueueSnackbarWithSuccess } =
    useNotification();

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    resolver: CheckoutSchema(),
    defaultValues: DefaultCheckoutFormState(),
  });

  const onSubmit = useCallback(
    async (values: CheckoutSchemaProps) => {
      try {
        if (!executeRecaptcha) return;

        await executeRecaptcha();

        setLoading(true);

        const { address, district, email, name, phone_number, province, ward, note } =
          values;

        const data = {
          status: 2,
          customer_name: name,
          customer_phone_number: phone_number,
          customer_email: email,
          customer_address: address,
          customer_province: province?.code,
          customer_district: district?.code,
          customer_ward: ward?.code,
          customer_note: note,
          requested_export_tax: false,
        };

        if (checkVAT) {
          if (dataVAT == undefined) return;

          const {
            name: export_tax_name,
            address: export_tax_address,
            tax_code: export_tax_identification_number,
            companyName: export_tax_company_name,
            email: export_tax_email,
            phone_number: export_tax_phone_number,
          } = dataVAT[0];

          let dataHaveVAT = {
            ...data,
            requested_export_tax: true,
            export_tax_name,
            export_tax_address,
            export_tax_identification_number,
            export_tax_company_name,
            export_tax_email,
            export_tax_phone_number,
          };

          await axios.patch(CART_END_POINT, dataHaveVAT, {
            headers: {
              "X-Cart-Key": cartKey,
            },
          });
        } else {
          let dataNoVat = clone(data);

          await axios.patch(CART_END_POINT, dataNoVat, {
            headers: {
              "X-Cart-Key": cartKey,
            },
          });
        }

        reset(DefaultCheckoutFormState, {
          keepDirty: false,
        });

        enqueueSnackbarWithSuccess(messages["order.success"]);

        mutate(CART_ITEMS_END_POINT);
        router.push("/order-success");
      } catch (error) {
        enqueueSnackbarWithError(error);
      } finally {
        if (isMounted()) {
          setLoading(false);
        }
      }
    },
    [cartKey, checkVAT, dataVAT, executeRecaptcha]
  );

  return (
    <Container>
      <SEO {...getSeoObject(undefined)} />

      <Title>{messages["order.bannerSubTitle"]}</Title>

      <Spacing spacing={3} />

      <Grid container spacing="40px">
        <Grid item xs={12} md={7}>
          <FormCheckout control={control} setValue={setValue} watch={watch} />
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack gap="32px">
            <OrderSection setTotalPrice={setTotalPrice} />

            <CheckVAT checkVAT={checkVAT} onOpenVAT={onOpenVAT} />

            <ModalVAT
              open={openVAT}
              onClose={onCloseVAT}
              setDataVAT={setDataVAT}
              setCheckVAT={setCheckVAT}
            />

            <StyledCenter>
              <StyledWrapperTotalPrice>
                <StyledText>{messages["cart.total"]}:</StyledText>

                <StyledTotalPrice value={totalPrice} />
              </StyledWrapperTotalPrice>
            </StyledCenter>

            <LoadingButton
              title="order.bannerTitle"
              loading={loading}
              buttonProps={{
                type: "submit",
                onClick: handleSubmit(onSubmit),
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

const StyledCenter = styled(Stack)(() => {
  return {
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledWrapperTotalPrice = styled(Stack)(() => {
  return {
    gap: 40,
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
  };
});

const StyledTotalPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    fontSize: 24,
    fontWeight: 600,
    lineHeight: "32px",
    letterSpacing: "-0.48px",
    color: theme.palette.primary.main,
  };
});
