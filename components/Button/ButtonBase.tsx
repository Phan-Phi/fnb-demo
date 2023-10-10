import { Button, styled } from "@mui/material";

import Box from "../Box/Box";
import { useRouter } from "next/router";

interface Props {
  text: string;
  link: string;
}

export default function ButtonBase({ text, link }: Props) {
  const router = useRouter();

  return (
    <StyledButton>
      <Button
        variant="contained"
        onClick={() => {
          router.push(link);
        }}
      >
        {text}
      </Button>
    </StyledButton>
  );
}

const StyledButton = styled(Box)(() => {
  return {
    display: "flex",
    justifyContent: "center",
    "& .MuiButtonBase-root": {
      textTransform: "capitalize !important",
    },
  };
});
