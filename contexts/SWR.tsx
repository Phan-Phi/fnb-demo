import { SWRConfig } from "swr";
import axios from "../axios.config";

type SWRProps = {
  children: React.ReactNode;
  fallback?: { [key: string]: any };
};

const SWR = ({ children, fallback }: SWRProps) => {
  return (
    <SWRConfig
      value={{
        fallback: fallback || {},
        refreshInterval: 30000,
        revalidateOnMount: true,
        fetcher: async (resource) => {
          return axios
            .get(resource)
            .then(async (res) => {
              return res.data;
            })
            .catch(async (err) => {
              throw err;
            });
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWR;
