import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { StackProps, styled } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";

import { useCart } from "@/hooks";
import { Box, LoadingPage, Stack } from "@/components";

const ModalExport = dynamic(import("../Modal/ModalExport"), {
  ssr: false,
});

interface MainPageProps extends StackProps {
  asPath: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isExported } = useCart();
  const { asPath } = useRouter();

  return (
    <MainPage asPath={asPath}>
      {isExported === null && <ModalExport />}
      {/* <LoadingPage /> */}
      <Header />
      <Navigation />
      <MainContent className="main-content">{children}</MainContent>
      <Footer />
    </MainPage>
  );
}

const MainPage = styled(Stack, {
  shouldForwardProp: (propName) => {
    return propName !== "asPath";
  },
})<MainPageProps>(({ theme, asPath }) => {
  return {
    minHeight: "100vh",

    ...(theme.palette.mode === "dark" && {
      backgroundColor: theme.palette.background.paper,
    }),

    ...(theme.palette.mode === "light" && {
      backgroundColor:
        asPath === "/"
          ? theme.palette.background.paper
          : theme.palette.background.default,
    }),
  };
});

const MainContent = styled(Box)(() => {
  return {
    flexGrow: 1,
    overflow: "hidden",
    padding: "9.5rem 0 1rem 0",
  };
});
