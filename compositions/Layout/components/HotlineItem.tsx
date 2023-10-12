import { useMemo } from "react";
import { Typography, styled } from "@mui/material";

import { Box, Link, PhoneNumberFormat, Stack } from "@/components";

interface Props {
  data: any;
}

export default function HotlineItem({ data }: Props) {
  const renderPhone = useMemo(() => {
    if (data == undefined) return null;
    const phone = data.filter((item: any) => item.block_type === "phone_number");

    return phone.map((el: any, idx: number) => {
      if (idx === 0) {
        return <Item data={el.value} isActive={false} key={idx} />;
      }
      return <Item data={el.value} key={idx} />;
    });
  }, [data]);

  // const renderHotlines = useMemo(() => {
  //   if (data == undefined) return null;
  //   const hotline = data.filter((item: any) => item.block_type === "hotline");

  //   return hotline.map((el: any, idx: number) => {
  //     if (idx === 0) {
  //       return <Item data={el.value} isActive={false} key={idx} />;
  //     }
  //     return <Item data={el.value} key={idx} />;
  //   });
  // }, [data]);

  return (
    <Box>
      <Stack direction="column" spacing={0.5}>
        {renderPhone}
      </Stack>

      {/* <Stack direction="row" spacing={0.5}>
        {renderHotlines}
      </Stack> */}
    </Box>
  );
}

interface ItemProps {
  isActive?: boolean;
  data: string;
}

const Item = ({ isActive = true, data }: ItemProps) => {
  return (
    <WrapperLink href={`tel:${data}`} className="asdasasdad">
      {isActive && <Text padding="0 0.5rem"> - </Text>}
      <PhoneNumberFormat value={data} />
    </WrapperLink>
  );
};

const WrapperLink = styled(Link)(({ theme }) => {
  return {
    margin: "0 !important",
    "& span": {
      ...theme.typography.p_large,
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  };
});

const Text = styled(Typography)(({ theme }) => {
  return { ...theme.typography.p_large };
});
