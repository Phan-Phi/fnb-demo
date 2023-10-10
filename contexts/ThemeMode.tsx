import { useUpdateEffect } from "react-use";
import React, { createContext, useCallback, useEffect, useState } from "react";

export type MODE_TYPE = "light" | "dark";

export const ThemeModeContext = createContext<{
  mode: MODE_TYPE;
  setMode: (value: MODE_TYPE) => void;
}>({
  mode: "light",
  setMode: () => {},
});

const ThemeModeProvider = ({ children }: { children?: React.ReactNode }) => {
  const [mode, setMode] = useState<MODE_TYPE>("light");

  const setNewMode = useCallback((value: MODE_TYPE) => {
    setMode(value);
    localStorage.setItem("theme", value);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    // const { matches: isLightTheme } = window.matchMedia("(prefers-color-scheme: dark)");

    if (theme === "light" || theme === "dark") {
      setMode(theme);
    } else {
      setMode("light");
    }
  }, []);

  useUpdateEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ThemeModeContext.Provider
      value={{
        mode,
        setMode: setNewMode,
      }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
