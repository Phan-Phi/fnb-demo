import React, { useMemo } from "react";
import { useRouter } from "next/router";

import { get } from "lodash";
import { Box, Stack, Typography, styled } from "@mui/material";

import {
  Link,
  TimeIcon,
  PhoneIcon,
  EmailIcon,
  AddressIcon,
  PhoneNumberFormat,
} from "@/components";
import { useSetting } from "@/hooks";

export default function ContactInfo() {
  const router = useRouter();
  const setting = useSetting();

  const address = get(setting, "address");
  const addressEn = get(setting, "address_en");
  const hotlines = get(setting, "hotlines");
  const emails = get(setting, "emails");
  const workingTimes = get(setting, "working_times");
  const workingTimesEn = get(setting, "working_times_en");

  const renderHotlines = useMemo(() => {
    if (hotlines == undefined) return null;

    return hotlines.map((item, index) => {
      return (
        <StyledLink key={index} href={`tel: ${item.value}`}>
          <PhoneNumberFormat value={item.value} />
        </StyledLink>
      );
    });
  }, [hotlines]);

  const renderEmails = useMemo(() => {
    if (emails == undefined) return null;

    return emails.map((item, index) => {
      return (
        <StyledLink key={index} href={`mailto: ${item.value}`}>
          {item.value}
        </StyledLink>
      );
    });
  }, [emails]);

  const renderWorkingTimes = useMemo(() => {
    if (workingTimes == undefined || workingTimesEn == undefined) return null;

    if (router.locale === "vi") {
      return workingTimes.map((item, index) => {
        return <StyledText key={index}>{item.value}</StyledText>;
      });
    } else {
      return workingTimesEn.map((item, index) => {
        return <StyledText key={index}>{item.value}</StyledText>;
      });
    }
  }, [workingTimes, router.locale]);

  if (setting == undefined) return null;

  return (
    <Stack gap="8px">
      <StyledStack>
        <PhoneIcon />

        <StyledWrapperHotlines divider={<StyledLine />}>
          {renderHotlines}
        </StyledWrapperHotlines>
      </StyledStack>

      <StyledStack>
        <EmailIcon />

        {renderEmails}
      </StyledStack>

      <StyledStack>
        <AddressIcon />

        <StyledText>{router.locale === "vi" ? address : addressEn}</StyledText>
      </StyledStack>

      <StyledStack>
        <TimeIcon />

        <Box>{renderWorkingTimes}</Box>
      </StyledStack>
    </Stack>
  );
}

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    color: theme.palette.common.black,
  };
});

const StyledLink = styled(Link)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    color: theme.palette.common.black,
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledWrapperHotlines = styled(Stack)(() => {
  return {
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledLine = styled(Box)(({ theme }) => {
  return {
    width: 8,
    height: 1,
    margin: "0 10px",

    // top: -5,
    position: "relative",
    backgroundColor: theme.palette.text.primary,
  };
});
