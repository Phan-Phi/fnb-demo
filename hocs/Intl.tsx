import { useMemo } from "react";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";

import English from "@/locales/compiled/en.json";
import Vietnamese from "@/locales/compiled/vi.json";

interface IntlWrapperProps {
  children?: React.ReactNode;
}

const IntlWrapper = ({ children }: IntlWrapperProps) => {
  const router = useRouter();
  const { locale, defaultLocale } = router;

  const messages = useMemo(() => {
    if (locale === "en") return English;

    return Vietnamese;
  }, [locale]);

  return (
    <IntlProvider
      locale={locale || "vi"}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      {children}
    </IntlProvider>
  );
};

export default IntlWrapper;
