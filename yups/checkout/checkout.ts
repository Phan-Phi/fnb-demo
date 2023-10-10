import { mixed, object, string } from "yup";
import { validatePhoneNumber } from "../utils";
import { yupResolver } from "@hookform/resolvers/yup";

type PROVINCE_ITEM = {
  code: number;
  name: string;
};

type DISTRICTS_ITEM = {
  code: number;
  name: string;
  province_code: number;
};

type WARD_ITEM = {
  code: number;
  name: string;
  district_code: number;
};

export interface CheckoutSchemaProps {
  name: string;
  phone_number: string;
  email: string;
  address: string;
  province: PROVINCE_ITEM | null;
  district: DISTRICTS_ITEM | null;
  ward: WARD_ITEM | null;

  note?: string;
}

export const CheckoutSchema = () => {
  return yupResolver(
    object().shape({
      name: string().required(),
      email: string().required().email("Định dạng email sai"),
      phone_number: validatePhoneNumber().required(),
      address: string().required(),
      province: mixed().required(),
      district: mixed().required(),
      ward: mixed().required(),
      note: string(),
    })
  );
};

export const DefaultCheckoutFormState = (): CheckoutSchemaProps => {
  return {
    name: "",
    phone_number: "",
    email: "",
    address: "",
    province: null,
    district: null,
    ward: null,
    note: "",
  };
};
