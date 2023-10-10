import { useIntl as useIntlOriginal } from "react-intl";

const useIntl = () => {
  const intl = useIntlOriginal();

  const messages = intl.messages as Record<string, string>;

  return { ...intl, messages };
};

export { useIntl };
