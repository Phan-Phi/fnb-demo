import React from "react";
import { useMeasure } from "react-use";

import { get } from "lodash";
import { Box } from "@mui/material";
import { useSetting } from "@/hooks";
import { MAP_RATIO } from "@/constants";

export default function Map() {
  const settings = useSetting();
  const [ref, { width }] = useMeasure();
  const src = get(settings, "address_google_map_iframe_link");

  return (
    <Box ref={ref}>
      <iframe
        src={src}
        width={width}
        height={width / MAP_RATIO}
        loading="lazy"
        allowFullScreen={false}
        style={{ border: "none" }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
}
