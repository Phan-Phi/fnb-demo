const PREFIX = "api/v2";

const PROVINCES = "api/v2/provinces";
const DISTRICTS = "api/v2/provinces/districts";
const WARDS = "api/v2/provinces/districts/wards";

const PAGES = "pages";

const generatePathname = (data: string[]): string => {
  const arr = [PREFIX, ...data];
  return `/${arr.join("/")}/`;
};

export const PROVINCES_API = `/${PROVINCES}/`;
export const DISTRICTS_API = `/${DISTRICTS}/`;
export const WARDS_API = `/${WARDS}/`;
export const PAGES_API = generatePathname([PAGES]);
