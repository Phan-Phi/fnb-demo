import { string } from "yup";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

export const validatePhoneNumber = () => {
  return string()
    .default("+84")
    .test({
      test: (value) => {
        if (value) {
          const phoneNumber = parsePhoneNumber(value);

          if (phoneNumber) {
            if (phoneNumber.country !== "VN") return false;

            if (isValidPhoneNumber(phoneNumber.number)) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      message: "Số điện thoại không hợp lệ",
    });
};

export const transformNumberNotEmpty = () => {
  return string().transform(function (value) {
    return value === "" ? "0" : value;
  });
};
