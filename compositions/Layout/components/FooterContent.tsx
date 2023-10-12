import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { Grid, Typography, styled } from "@mui/material";

import HotlineItem from "./HotlineItem";

import { transformUrl } from "@/libs";
import { NAVBAR_ROUTES } from "@/routes";
import { PAGES_API } from "@/apis";
import { PAGE_TYPES } from "@/__generated__/END_POINT";
import { useFetch, useIntl, useMedia, useSetting } from "@/hooks";
import { Box, ImageRatio, Link, Ratio, Stack } from "@/components";

interface BoxPolicyProps {
  isActive: boolean;
}

export default function FooterContent() {
  const setting = useSetting();
  const { messages } = useIntl();
  const { locale } = useRouter();
  const { isMdUp } = useMedia();

  const api = [
    {
      type: PAGE_TYPES.NEWS_NEWSPAGE,
      fields: "*",
      locale,
    },
  ];

  const { data, changeKey } = useFetch(
    transformUrl(PAGES_API, {
      ...api[0],
    })
  );

  useEffect(() => {
    changeKey(
      transformUrl(PAGES_API, {
        ...api[0],
        locale,
      })
    );
  }, [locale]);

  const {
    address,
    address_en,
    tax_identification_number,
    footer_description,
    footer_description_en,
    company_name,
    company_name_en,
    working_times,
    ministry_link,
    ministry_logo,
  } = setting;

  const renderPolicy = useMemo(() => {
    if (data == undefined) return null;

    const policy = data.filter((el) => el.is_on_footer === true);

    return policy.map((el, idx) => {
      return (
        <Stack direction="row" key={idx} alignItems="center">
          {idx !== 0 && <LinePolicy />}
          <BoxPolicy href={`/news/${el.id}`} isActive={idx !== 0 ? true : false}>
            <TextPolicy>{el.title}</TextPolicy>
          </BoxPolicy>
        </Stack>
      );
    });
  }, [data]);

  const renderWorkingTime: any = useMemo(() => {
    if (working_times == undefined) return [];

    return working_times.map((el, idx) => {
      return el.value;
    });
  }, [working_times]);

  if (setting == undefined) return null;

  return (
    <>
      <Wrapper>
        <Stack direction="row">{renderPolicy}</Stack>

        <Box padding="1rem 0">
          <Text>
            {locale === "vi"
              ? `${company_name}, ${address}`
              : `${company_name_en}, ${address_en}`}
          </Text>
          <Text>
            {messages["footer.workingTimes"]}{" "}
            {working_times && renderWorkingTime.join("-")}
          </Text>
          <Text>
            {messages["footer.EIN"]}: {tax_identification_number}
          </Text>
          <Text>{locale === "vi" ? footer_description : footer_description_en}</Text>
        </Box>

        <Link href={ministry_link ? ministry_link : ""} target="_blank">
          {/* <ImageRatio
            ratio="0"
            imageProps={{ src: (ministry_logo ? ministry_logo : null) as any }}
            boxProps={{ width: "105px", height: "40px" }}
          /> */}
          {ministry_logo && (
            <ImageRatio
              ratio="0"
              imageProps={{ src: ministry_logo as any }}
              boxProps={{ width: "105px", height: "40px" }}
            />
          )}
        </Link>

        <CopyRight>© 2023 FNB. All rights reserved.</CopyRight>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(Stack)(() => {
  return {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };
});

const Text = styled(Typography)(({ theme }) => {
  return { ...theme.typography.p_medium };
});

const TextPolicy = styled(Typography)(({ theme }) => {
  return { ...theme.typography.p_large, fontWeight: 600, textTransform: "capitalize" };
});

const BoxPolicy = styled(Link, {
  shouldForwardProp: (propName) => {
    return propName !== "isActive";
  },
})<BoxPolicyProps>(({ theme, isActive }) => {
  return {
    "& .MuiTypography-root": {
      color: theme.palette.primary.main,
      padding: "0 2.5rem",
    },
  };
});

const LinePolicy = styled(Box)(({ theme }) => {
  return {
    width: "2px",
    height: "18px",
    background: theme.palette.text.primary,
  };
});

const CopyRight = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    color: theme.palette.primary.main,
    marginTop: "1rem",
  };
});
