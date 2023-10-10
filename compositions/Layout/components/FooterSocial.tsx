import { useMemo } from "react";
import { Typography, styled } from "@mui/material";

import HotlineItem from "./HotlineItem";
import PhonePrimaryIcon from "@/components/Icon/PhonePrimaryIcon";
import EmailPrimaryIcon from "@/components/Icon/EmailPrimaryIcon";

import { DEFAULT_NAME_TYPE } from "@/__generated__";
import { Box, Image, Link, Ratio, Stack } from "@/components";
import { useIntl } from "@/hooks";

interface Props {
  dataSetting: DEFAULT_NAME_TYPE;
}

const demo = [
  {
    block_type: "email",
    value: "hello@fnb39.com",
  },
  {
    block_type: "email",
    value: "hello@fnb39.com",
  },
  {
    block_type: "email",
    value: "hello@fnb39.com",
  },
];

export default function FooterSocial({ dataSetting }: Props) {
  const { footer_social_icon, footer_ecom_icon, hotlines, emails } = dataSetting;

  const { messages } = useIntl();

  const renderHotlines = useMemo(() => {
    if (hotlines == undefined) return null;

    return <HotlineItem data={hotlines} />;
  }, [hotlines]);

  const renderEmails = useMemo(() => {
    if (emails == undefined) return null;

    return emails.map((el, idx) => {
      return <Text key={idx}>{el.value}</Text>;
    }, []);
  }, [emails]);

  const renderEcomIcon = useMemo(() => {
    if (footer_ecom_icon == undefined) return null;
    return footer_ecom_icon.map((el: any, idx: number) => {
      const { value } = el;

      return (
        <Link key={idx} href={`${value.link}`} target="_blank">
          <Ratio ratio="0" width={32} height={32}>
            <Image src={value.icon} alt="" />
          </Ratio>
        </Link>
      );
    });
  }, [footer_ecom_icon]);

  const renderSocialIcon = useMemo(() => {
    if (footer_social_icon == undefined) return null;
    return footer_social_icon.map((el: any, idx: number) => {
      const { value } = el;

      return (
        <Link key={idx} href={`${value.link}`} target="_blank">
          <Ratio ratio="0" width={32} height={32}>
            <Image src={value.icon} alt="" />
          </Ratio>
        </Link>
      );
    });
  }, [footer_social_icon]);

  return (
    <Wrapper direction="row">
      <Stack direction="row" spacing={0.5}>
        <Phone />
        <Box>
          <Title>{messages["footer.phoneNumber"]}</Title>
          <Stack direction="row" spacing={2}>
            {renderHotlines}
          </Stack>
        </Box>
      </Stack>

      <Stack direction="row" spacing={0.5} alignItems="center">
        <Email />
        <Box>
          <Title>Email</Title>
          <Stack direction="column" spacing={2}>
            {renderEmails}
          </Stack>
        </Box>
      </Stack>

      <Box>
        <Title>Theo Dõi</Title>
        <Stack direction="row" spacing={2}>
          {renderSocialIcon}
        </Stack>
      </Box>

      <Box>
        <Title>{messages["footer.e-commerce"]}</Title>
        <Stack direction="row" spacing={2}>
          {renderEcomIcon}
        </Stack>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled(Stack)(({ theme }) => {
  return {
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1.25rem",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    textAlign: "left",
  };
});

const Text = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    textAlign: "left",
    marginTop: "0.3rem !important",
  };
});

const Phone = styled(PhonePrimaryIcon)(({ theme }) => {
  return {
    width: "3rem",
    height: "3rem",
    "& path": {
      stroke: theme.palette.primary.main,
    },
  };
});

const Email = styled(EmailPrimaryIcon)(({ theme }) => {
  return {
    width: "3rem",
    height: "3rem",
    "& path": {
      stroke: theme.palette.primary.main,
    },
  };
});
