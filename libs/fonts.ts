import localFont from "next/font/local";
import { Inter, Bungee, Roboto, Jura, Nunito_Sans, Roboto_Slab } from "next/font/google";

const RobotoFont = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const SVNPoppins = localFont({
  src: [
    {
      path: "../public/fonts/SVN-Poppins-Bold.otf",
    },
  ],
});

const InterFont = Inter({
  weight: ["600"],
  subsets: ["latin"],
});

const JuraFont = Jura({
  weight: ["400"],
  subsets: ["latin"],
});

const NunitoSansFont = Nunito_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

const RobotoSlabFont = Roboto_Slab({
  weight: ["500"],
  subsets: ["latin"],
});

const BungeeFont = Bungee({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export {
  RobotoFont,
  BungeeFont,
  JuraFont,
  NunitoSansFont,
  RobotoSlabFont,
  InterFont,
  SVNPoppins,
};
