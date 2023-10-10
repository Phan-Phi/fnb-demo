export type PROVINCES_TYPE = {
  code: number;
  name: string;
};

export type DISTRICTS_TYPE = {
  code: number;
  name: string;
  province_code: number;
};

export type WARD_TYPE = {
  code: number;
  name: string;
  district_code: number;
};
