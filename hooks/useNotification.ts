import { useCallback, useState } from "react";

import { useSnackbar } from "notistack";

import axios from "axios";

import get from "lodash/get";
import { useIntl } from "./useIntl";

export const useNotification = () => {
  const { messages } = useIntl();

  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueSnackbarWithSuccess = useCallback((message: string) => {
    enqueueSnackbar(message, {
      variant: "success",
    });
  }, []);

  const enqueueSnackbarWithError = useCallback((err: unknown) => {
    if (axios.isAxiosError(err)) {
      const ortherMessage = get(err, "response.data.message");
      const listError = get(err, "response.data.detail");

      const listKey_error = listError.map((el: any) => {
        const key = Object.keys(el);
        return key;
      });

      if (listKey_error) {
        enqueueSnackbar(
          listKey_error.includes("phone_number")
            ? messages["contact.error.phone_number"]
            : ortherMessage,
          {
            variant: "error",
          }
        );
      }
    }
  }, []);

  return {
    loading,
    setLoading,
    enqueueSnackbar,
    closeSnackbar,
    enqueueSnackbarWithSuccess,
    enqueueSnackbarWithError,
  };
};
