type ZALO_QUERY_TYPE = {
  [key: string]: any;
};
export const OMIT_ZALO_QUERY: ZALO_QUERY_TYPE = {
  utm_campaign: undefined,
  utm_medium: undefined,
  utm_source: undefined,
  zarsrc: undefined,
} as const;

export const URL_DEFAULT_IMAGE = "/image/default.png";

// Ratio IMG
export const CATEGORY_IMG_RATIO = "378 / 300";
export const MAP_RATIO = 576 / 525;
export const PRODUCT_IMG_RATIO = "240 / 240";

export const HERO_RATIO_DESKTOP = "1200/300";
export const HERO_RATIO_TABLET = "601/740";
export const HERO_RATIO_MOBILE = "375/740";

export const LARGE_CAROUSEL_IMG = "564 / 400";
export const SMALL_CAROUSEL_IMG = "185 / 120";

// BoxShadow
export const CARD_PRODUCT_BOX_SHADOW =
  "0px 4px 6px -4px rgba(16, 24, 40, 0.10), 0px 10px 15px -3px rgba(16, 24, 40, 0.10)";

export const FILTER_BOX_SHADOW = "0px 25px 50px -12px rgba(16, 24, 40, 0.25)";

//Linear Gradient
export const CATEGORY_IMG_GRADIENT =
  "linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%)";

export const BUTTON_HOVER =
  "linear-gradient(0deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%), (#991B1F)";

export const BUTTON = {
  SEE_MORE: "Xem Thêm",
  SEND_INFO: "Gửi Thông Tin",
  BUY: "Chọn Mua",
  BOUGHT: "Đã Thêm Vào Giỏ Hàng",
  CONTINUE: "Tiếp Tục",
  CONFIRM: "Xác Nhận",
};

export const ABOUT_SECTION_RATIO = {
  desktop: "500/319.5",
  desktop2: "240/319.5",
  tablet: "276/319.5",
  mobile: "568/319.5",
};

export const EXPORT_SECTION_RATIO = {
  desktop: "1200/324",
  tablet: "276/319.5",
  mobile: "375/200",
};

export const RATIO_HOME_BANNER = {
  desktop: "1200/500",
  tablet: "601/740",
  mobile: "375/740",
};

export const RATIO_NEWS = {
  desktop: "378/345",
  tablet: "569/345",
};
