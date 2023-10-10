import { useMemo } from "react";
import { FormHelperText, styled } from "@mui/material";

import { useIntl } from "@/hooks";

interface Props {
  name: string;
  mess: any;
}

export default function MuiFormHelperText({ name, mess }: Props) {
  const { messages } = useIntl();

  const render = useMemo(() => {
    if (mess.type === "required") {
      return <Error>{messages["contact.error.required"]}</Error>;
    }
    if (mess.type === name) {
      return <Error>{messages[`contact.error.${name}`]}</Error>;
    }
  }, [mess.type]);

  return render;
}

const Error = styled(FormHelperText)(() => {
  return {
    marginLeft: "0 !important",
  };
});
