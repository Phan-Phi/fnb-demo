import { styled } from "@mui/material";

import { useSetting } from "@/hooks";
import { Box, Image, Link } from "@/components";

export default function LogoHeader() {
  const setting = useSetting();

  const { logo } = setting;

  return (
    <Link href="/">
      <StyledBox>
        <Image src={logo} alt="logo" />
      </StyledBox>
    </Link>
  );
}

const StyledBox = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    width: "100px",
    height: "70px",

    "& img": {
      objectFit: "cover",
    },

    [theme.breakpoints.down("md")]: {
      width: "55px",
      height: "50px",
    },
  };
});
