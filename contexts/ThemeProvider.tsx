import {
  CssBaseline,
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { useMemo } from "react";

import useThemeMode from "@/hooks/useThemeMode";
import { getPaletteTheme } from "@/theme/color";
import { typographyTheme } from "@/theme/typography";
import { ComponentsTheme } from "@/theme/components";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useThemeMode();

  const theme = useMemo(() => {
    return createTheme({
      typography: typographyTheme,
      palette: getPaletteTheme(mode),
      components: ComponentsTheme,
    });
  }, [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
