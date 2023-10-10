import { NextSeo, NextSeoProps } from "next-seo";

import { useSetting } from "@/hooks";

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  locale?: string;
  defaultNextSeo?: NextSeoProps;
};

const SEO = (props: SEOProps) => {
  const setting = useSetting();

  const { title, description, locale, defaultNextSeo, image } = props;
  const {
    favicon,
    og_image,
    seo_description,
    seo_description_en,
    seo_title,
    seo_title_en,
  } = setting;

  const headTitle =
    title == undefined
      ? undefined
      : `${title} ${locale === "en" ? seo_title_en : seo_title}`;

  const descriptionLocale = locale === "en" ? seo_description_en : seo_description;

  const seoTitleLocale = locale === "en" ? seo_title_en : seo_title;

  return (
    <NextSeo
      title={headTitle || seoTitleLocale || ""}
      description={description || descriptionLocale || ""}
      openGraph={{
        title: headTitle || seoTitleLocale || "",
        description: description || descriptionLocale || "",
        site_name: seoTitleLocale,
        locale: locale,
        images: [
          {
            url: image || og_image || "",
            alt: headTitle,
            type: "image/jpeg",
          },
        ],
      }}
      additionalLinkTags={[
        {
          rel: "icon",
          href: "https://demo-fnb.t-solution.vn/media/original_images/fnb-logo.png" || "",
        },
        {
          rel: "apple-touch-icon",
          href: "https://demo-fnb.t-solution.vn/media/original_images/fnb-logo.png" || "",
        },
      ]}
      {...defaultNextSeo}
    />
  );
};

export default SEO;
