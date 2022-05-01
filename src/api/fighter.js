import axios from "axios";

export const initGetFighters = (baseUrl) => () =>
  axios.get(`${baseUrl}/fighters`);

export const initGetFighter = (baseUrl) => (id) =>
  axios.get(`${baseUrl}/fighters/${id}`);

export const initGetSelectedFighters = (baseUrl) => (query) =>
  axios.get(`${baseUrl}/fighters`, {
    params: query,
  });
