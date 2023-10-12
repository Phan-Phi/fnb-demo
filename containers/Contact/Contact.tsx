import React from "react";
import { get } from "lodash";
import { Container, Grid, Stack, Typography, styled } from "@mui/material";

import { Banner, SEO } from "@/components";
import Map from "./components/Map";
import FormContact from "./components/FormContact";
import ContactInfo from "./components/ContactInfo";

import { IPage } from "@/interfaces";
import { getSeoObject } from "@/libs";
import { CONTACT_PAGE_TYPE } from "@/__generated__";

export type ContactProps = IPage<[CONTACT_PAGE_TYPE]>;

export default function Contact(props: ContactProps) {
  const data = get(props, "initData");
  const meta = get(data, "[0].items[0].meta");
  const title = get(data, "[0].items.[0].title");
  const subTitle = get(data, "[0].items.[0].subtitle");
  const banner = get(data, "[0].items[0].banner");

  return (
    <Container>
      <SEO {...getSeoObject(meta)} />

      <Banner imgSrc={banner} title={subTitle} />

      <StyledTitle>{title}</StyledTitle>

      <Grid container spacing="20px">
        <Grid item xs={6}>
          <FormContact />
        </Grid>

        <Grid item xs={6}>
          <Stack gap="8px">
            <Map />

            {/* <ContactInfo /> */}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.RobotoSlab_xSmall,
    color: theme.palette.text.primary,
    textAlign: "center",
    letterSpacing: "-1.04px",
    textTransform: "capitalize",
  };
});
