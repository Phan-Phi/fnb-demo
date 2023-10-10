import { SettingContext } from "@/contexts/Setting";
import { useContext } from "react";

export const useSetting = () => {
  const data = useContext(SettingContext);

  return data;
};
