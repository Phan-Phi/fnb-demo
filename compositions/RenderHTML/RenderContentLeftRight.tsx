import { useMeasure } from "react-use";
import { Grid, styled } from "@mui/material";

import RenderHTML from "./RenderHTML";
import { Box, Image } from "@/components";
import { BlockTypeContentImage, BlockTypeImageContent } from "@/interfaces";

interface Props {
  data: BlockTypeImageContent | BlockTypeContentImage;
}

const size = 3 / 2;

export default function RenderContentLeftRight({ data }: Props) {
  const { value, block_type } = data;

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <StyledGrid
      container
      spacing={2}
      flexDirection={block_type === "image_content" ? "row" : "row-reverse"}
    >
      <Grid item xs={6}>
        <Box ref={ref}>
          <Box position="relative" width="100%" height={width / size}>
            <Image src={value.image} alt="" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <RenderHTML data={value.content} />
      </Grid>
    </StyledGrid>
  );
}

const StyledGrid = styled(Grid)(({ theme }) => {
  return {};
});
