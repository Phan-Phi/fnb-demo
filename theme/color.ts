import { ThemeOptions } from "@mui/material";

import { MODE_TYPE } from "@/contexts/ThemeMode";
import { COLOR_PALETTE } from "@/configuration";

export const getPaletteTheme = (mode: MODE_TYPE): ThemeOptions["palette"] => {
  return mode === "light" ? LIGHT_MODE : DARK_MODE;
};

const LIGHT_MODE: ThemeOptions["palette"] = {
  mode: "light",
  primary: {
    main: COLOR_PALETTE["brand"],
  },

  secondary: {
    main: COLOR_PALETTE["neutral-950"],
  },

  common: {
    white: COLOR_PALETTE["neutral-50"],
    black: COLOR_PALETTE["neutral-950"],
  },

  error: {
    main: COLOR_PALETTE["destructive-500"],
    light: COLOR_PALETTE["success-50"],
    dark: COLOR_PALETTE["destructive-800"],
  },

  success: {
    main: COLOR_PALETTE["success-500"],
    light: COLOR_PALETTE["success-200"],
    dark: COLOR_PALETTE["success-800"],
  },

  warning: {
    main: COLOR_PALETTE["warning-500"],
    light: COLOR_PALETTE["warning-200"],
    dark: COLOR_PALETTE["warning-800"],
  },

  text: {
    primary: COLOR_PALETTE["neutral-950"],
  },

  skeleton: {
    main: COLOR_PALETTE["neutral-900"],
  },

  background: {
    default: COLOR_PALETTE["neutral-50"],
    paper: COLOR_PALETTE["brand-200"],
  },

  border: {
    main: COLOR_PALETTE["neutral-400"],
  },
  neutral: {
    neutral700: COLOR_PALETTE["neutral-700"],
  },
};

const DARK_MODE: ThemeOptions["palette"] = {
  mode: "dark",
  primary: {
    main: COLOR_PALETTE["brand"],
  },

  secondary: {
    main: COLOR_PALETTE["neutral-50"],
  },

  common: {
    white: COLOR_PALETTE["neutral-50"],
    black: COLOR_PALETTE["neutral-950"],
  },

  error: {
    main: COLOR_PALETTE["destructive-500"],
    light: COLOR_PALETTE["success-50"],
    dark: COLOR_PALETTE["destructive-800"],
  },

  success: {
    main: COLOR_PALETTE["success-500"],
    light: COLOR_PALETTE["success-200"],
    dark: COLOR_PALETTE["success-800"],
  },

  warning: {
    main: COLOR_PALETTE["warning-500"],
    light: COLOR_PALETTE["warning-200"],
    dark: COLOR_PALETTE["warning-800"],
  },

  text: {
    primary: COLOR_PALETTE["neutral-50"],
  },

  skeleton: {
    main: COLOR_PALETTE["neutral-900"],
  },

  background: {
    default: COLOR_PALETTE["brand-300"],
    paper: COLOR_PALETTE["neutral-950"],
  },

  border: {
    main: COLOR_PALETTE["neutral-50"],
  },
  neutral: {
    neutral700: COLOR_PALETTE["neutral-700"],
  },
};
