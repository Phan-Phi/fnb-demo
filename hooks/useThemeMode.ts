import { useContext } from "react";
import { ThemeModeContext } from "@/contexts/ThemeMode";

const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  return context;
};

export default useThemeMode;
