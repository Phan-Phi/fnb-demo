import { object, string } from "yup";
import { validatePhoneNumber } from "../utils";
import { yupResolver } from "@hookform/resolvers/yup";

export interface VATSchemaProps {
  name: string;
  phone_number: string;
  companyName: string;
  tax_code: string;
  address: string;
  email: string;
}

export const VATSchema = () => {
  return yupResolver(
    object().shape({
      name: string().required(),
      phone_number: validatePhoneNumber().required(),
      companyName: string().required(),
      tax_code: string().required(),
      address: string().required(),
      email: string().required().email("Định dạng email sai"),
    })
  );
};

export const DefaultVATFormState = () => {
  return {
    name: "",
    phone_number: "",
    companyName: "",
    tax_code: "",
    address: "",
    email: "",
  };
};
