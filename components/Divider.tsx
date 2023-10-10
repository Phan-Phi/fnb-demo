import { DividerProps, Divider as MuiDivider, useTheme } from "@mui/material";

interface Props extends DividerProps {}

export default function Divider(props: DividerProps) {
  return <MuiDivider {...props} />;
}
