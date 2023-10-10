import { styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import OriginalNumberFormat from "react-number-format";

type PhoneNumberFormatProps = {
  value: string;
};

export default function PhoneNumberFormat(props: PhoneNumberFormatProps) {
  const { value } = props;

  const [format, setFormat] = useState("");

  useEffect(() => {
    if (value.length === 10) {
      setFormat("### ### ####");
    }

    if (value.length === 11) {
      setFormat("### ### ### ##");
    }
  }, [value]);

  return <StyledNumberFormat displayType="text" value={value} format={format} />;
}

const StyledNumberFormat = styled(OriginalNumberFormat)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
    color: theme.palette.text.primary,
  };
});
