import dynamic from "next/dynamic";
import { Fragment, useMemo } from "react";

import BannerAdvertisements from "./BannerAdvertisements";

const VideoSection = dynamic(import("../components/VideoSection"), { ssr: false });

interface Props {
  data: any;
}

export default function HomeAdvertisements({ data }: Props) {
  const render = useMemo(() => {
    return data.map((el: any, idx: number) => {
      const { block_type, value } = el;

      if (block_type === "video") {
        return (
          <VideoSection
            img={value.video_background}
            video={value.video_link}
            text={value.video_cta}
            key={idx}
          />
        );
      }

      if (block_type === "banner") {
        return (
          <BannerAdvertisements
            img={value.banner}
            link={value.banner_link}
            text={value.banner_cta}
            key={idx}
          />
        );
      }
      return;
    });
  }, []);

  return <Fragment>{render}</Fragment>;
}
