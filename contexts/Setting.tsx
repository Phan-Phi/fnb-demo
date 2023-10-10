import useSWR from "swr";
import { createContext, useMemo } from "react";

import { _END_POINT } from "@/__generated__/END_POINT";
import { DEFAULT_NAME_TYPE } from "@/__generated__";

type SettingProps = {
  children: React.ReactNode;
};

export const SettingContext = createContext<DEFAULT_NAME_TYPE>({} as DEFAULT_NAME_TYPE);

const Setting = ({ children }: SettingProps) => {
  const { data } = useSWR<DEFAULT_NAME_TYPE>(_END_POINT, {
    refreshInterval: 600 * 1000,
  });

  const memoData = useMemo(() => {
    if (data == undefined) return {} as DEFAULT_NAME_TYPE;

    return data;
  }, [data]);

  return <SettingContext.Provider value={memoData}>{children}</SettingContext.Provider>;
};

export default Setting;
