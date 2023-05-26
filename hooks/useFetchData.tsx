import axios from "axios";
import useSWR from "swr";

const useHourlyHeatQuery = (fileName: string) => {
  const fetcher = (url: string) =>
    axios.get(encodeURI(url)).then((res) => res.data.data);

  const key = `/api/download/${fileName}`;

  const { data, error } = useSWR(key, fetcher);
  return { data, error };
};

export default useHourlyHeatQuery;