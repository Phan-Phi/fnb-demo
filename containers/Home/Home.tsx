import { get } from "lodash";
import { Fragment, useMemo } from "react";
import dynamic from "next/dynamic";
import { Container, styled } from "@mui/material";

import { getSeoObject } from "@/libs";
import { Link, SEO } from "@/components";
import { IPage, responseSchema } from "@/interfaces";
import { HOME_PAGE_TYPE_ITEM_TYPE, PRODUCT_PAGE_TYPE_ITEM_TYPE } from "@/__generated__";

import WhyFNB from "./components/WhyFNB";
import HomeBanner from "./components/HomeBanner";
import Header from "@/compositions/Layout/Header";
import Footer from "@/compositions/Layout/Footer";
import NewProduct from "./components/NewProduct";
import HomeCategory from "./components/HomeCategory";
import TrendingProducts from "./components/TrendingProducts";
import OutstandingProducts from "./components/OutstandingProducts";
import HomeAdvertisements from "./components/HomeAdvertisements";

const ExportSection = dynamic(import("@/compositions/ExportSection/ExportSection"), {
  ssr: false,
});
export type HomePageProps = IPage<
  [
    responseSchema<HOME_PAGE_TYPE_ITEM_TYPE>,
    responseSchema<PRODUCT_PAGE_TYPE_ITEM_TYPE>,
    responseSchema<any>,
  ]
>;

export default function Home(props: HomePageProps) {
  const data = get(props, "initData[0].items[0]");
  const featuredProduct = get(props, "initData[1].items");

  const {
    meta,
    banner_title,
    banner,
    banner_link,
    export_cta,
    local_cta,
    local_image,
    export_image,
    advertisements,
  } = data;

  return (
    <Fragment>
      <StyledContainer>
        <SEO {...getSeoObject(meta)} />
        {/* <Header /> */}

        <HomeBanner
          link={banner_link}
          img={banner}
          title={banner_title}
          isHomePage={true}
        />

        <HomeCategory />

        {featuredProduct && <OutstandingProducts data={featuredProduct[0]} />}
        {featuredProduct && <TrendingProducts data={featuredProduct[1]} />}

        <ExportSection data={{ export_cta, local_cta, local_image, export_image }} />
        <WhyFNB data={data} />

        <NewProduct />
      </StyledContainer>

      <HomeAdvertisements data={advertisements} />

      {/* <Footer /> */}
    </Fragment>
  );
}

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    padding: "0 !important",
  };
});
