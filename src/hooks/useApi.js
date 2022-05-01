import {
  initGetFighters,
  initGetFighter,
  initGetSelectedFighters,
} from "../api/fighter";

export const useApi = () => {
  const baseURL = "http://localhost:3001";

  return {
    // Fighters
    getFighters: initGetFighters(baseURL),
    getSelectedFighters: initGetSelectedFighters(baseURL),

    //Fighter
    getFighter: initGetFighter(baseURL),
  };
};
