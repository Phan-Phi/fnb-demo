import { Box } from "@mui/material";

type PropsTabPanel = {
  children: React.ReactNode;

  value: number;
  index: number;
};

export default function TabPanel({ children, value, index }: PropsTabPanel) {
  return value == index ? <Box hidden={value !== index}>{children}</Box> : null;
}
