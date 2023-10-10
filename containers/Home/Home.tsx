import { get } from "lodash";
import dynamic from "next/dynamic";
import { Container, styled } from "@mui/material";

import { Image, Link, SEO } from "@/components";
import { useCheckCategory, useSetting } from "@/hooks";
import { getSeoObject } from "@/libs";
import { IPage, responseSchema } from "@/interfaces";
import { HOME_PAGE_TYPE_ITEM_TYPE } from "@/__generated__";

import WhyFNB from "./components/WhyFNB";
import HomeBanner from "./components/HomeBanner";
import Header from "@/compositions/Layout/Header";
import Footer from "@/compositions/Layout/Footer";
import NewProduct from "./components/NewProduct";
import OutstandingProducts from "./components/OutstandingProducts";
import TrendingProducts from "./components/TrendingProducts";
import HomeCategory from "./components/HomeCategory";

const VideoSection = dynamic(import("../Home/components/VideoSection"), { ssr: false });

export type HomePageProps = IPage<
  [responseSchema<HOME_PAGE_TYPE_ITEM_TYPE>, responseSchema<any>, responseSchema<any>]
>;

export default function Home(props: HomePageProps) {
  const setting = useSetting();

  const data = get(props, "initData[0].items[0]");
  const newProduct = get(props, "initData[1].items");
  const category = get(props, "initData[2].items");

  const {
    meta,
    video_cta,
    video_link,
    export_cta,
    export_image,
    local_cta,
    local_image,
    banner_title,
    banner,
    banner_link,
  } = data;

  return (
    <>
      <StyledContainer>
        <SEO {...getSeoObject(meta)} />

        {/* <Header /> */}

        <Link href={banner_link} target="_blank">
          <HomeBanner img={banner} title={banner_title} isHomePage={true} />
        </Link>

        <HomeCategory />
        <OutstandingProducts />
        <TrendingProducts />

        <WhyFNB />

        <NewProduct data={newProduct} />
      </StyledContainer>
      <VideoSection img="/image/video-section.png" video={video_link} text={video_cta} />

      {/* <Footer /> */}
    </>
  );
}

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    padding: "0 !important",
  };
});
