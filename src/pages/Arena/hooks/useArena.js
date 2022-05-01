import { useState, useEffect } from "react";
import * as qs from "qs";
import { useLocation } from "react-router-dom";
import { useApi, useDataFetch } from "../../../hooks";

const DEFAULT_FIGHTER = {
  id: null,
  name: null,
  health: null,
  attack: null,
  defense: null,
  avatar: null,
  source: null,
};

const DEFAULT_SELECTED_PAIR = {
  playerOne: DEFAULT_FIGHTER,
  playerTwo: DEFAULT_FIGHTER,
};

export const useArena = () => {
  const { getSelectedFighters } = useApi();
  const { search } = useLocation();
  const [fighters, setFighters] = useState([]);
  const [selectedPair, setSelectedPair] = useState(DEFAULT_SELECTED_PAIR);

  const parsedQueryString = qs.parse(search.replace(/^\?/, ""));

  const [, getFighterInfo] = useDataFetch({
    fetchHandler: async (ids) => {
      const res = await getSelectedFighters({ id: ids });
      setFighters(res.data);
    },
    isLazy: true,
  });

  useEffect(() => {
    getFighterInfo(Object.values(parsedQueryString));
  }, []);

  useEffect(() => {
    let mappedFighters = {};

    fighters.forEach((fighter) => {
      Object.keys(parsedQueryString).forEach((item) => {
        if (fighter.id === +parsedQueryString[item]) {
          mappedFighters = { ...mappedFighters, [item]: fighter };
        }
      });

      setSelectedPair(mappedFighters);
    });
  }, [fighters]);

  return { selectedPair };
};
