import { useMemo } from "react";
import { styled } from "@mui/material";

import Link from "../Link";
import Box from "../Box/Box";
import Stack from "../Stack";
import Image from "../Image";
import Ratio from "../Box/Ratio";
import { useSetting } from "@/hooks";

export default function ContactSocial() {
  const setting = useSetting();

  const { contact_icon } = setting;

  const render = useMemo(() => {
    return contact_icon.map((el: any, idx: number) => {
      const { value, block_type } = el;

      return (
        <Link
          href={block_type === "contact_tel_icon" ? `tel:${value.tel}` : value.link}
          target="_blank"
          key={idx}
        >
          <StyledRatio ratio="1/1" width={48}>
            <Image src={value.icon} alt="" />
          </StyledRatio>
        </Link>
      );
    });
  }, [contact_icon]);

  return (
    <Wrapper>
      <Stack spacing={1}>{render}</Stack>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    position: "fixed",
    right: "1rem",
    bottom: 110,
    zIndex: 1,
  };
});

const StyledRatio = styled(Ratio)(({ theme }) => {
  return {
    width: "3rem",

    [theme.breakpoints.down("md")]: {
      width: "2.5rem",
    },
  };
});
