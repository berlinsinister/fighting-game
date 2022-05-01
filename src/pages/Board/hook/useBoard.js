import { useState, useMemo } from "react";
import { useApi, useDataFetch } from "../../../hooks";

export const useBoard = () => {
  const { getFighters, getFighter } = useApi();
  const [fighters, setFighters] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [] = useDataFetch({
    fetchHandler: async () => {
      setLoading(true);
      const res = await getFighters();
      setFighters(res?.data);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const [fighterRes, getFighterInfo] = useDataFetch({
    fetchHandler: async (id) => {
      const res = await getFighter(id);

      return {
        data: res.data,
      };
    },
    isLazy: true,
    initialData: [],
  });

  const fighterMemo = useMemo(
    () => fighterRes.data,
    [JSON.stringify(fighterRes.data)]
  );

  return { fighters, fighter: fighterMemo, getFighterInfo, isLoading };
};
