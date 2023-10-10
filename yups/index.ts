import { setLocale } from "yup";

export * from "./vat/vat";
export * from "./contact/contact";
export * from "./checkout/checkout";

setLocale({
  mixed: {
    required: "Trường này là bắt buộc",
  },
});
