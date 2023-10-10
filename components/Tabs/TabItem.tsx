import { Typography } from "@mui/material";

import Box from "../Box/Box";

interface Props {
  name: string;
  id: number;
}

export default function TabItem({ name, id }: Props) {
  return (
    <Box>
      <Typography>{name}</Typography>
    </Box>
  );
}
