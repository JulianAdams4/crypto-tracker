import mockedSerie from "assets/serie.json";
import api, { buildAuthorization } from "./instance";

export const getAutoSingIn = (appId) => {
  return api.post("/user/auto", { appId });
};

export const getTopAssets = (authData) => {
  return api.get("/crypto/all", { headers: buildAuthorization(authData) });
};

export const getAssetTimeseries = (
  authData,
  { asset, start, end, interval }
) => {
  return Promise.resolve(mockedSerie[asset]);
  // return api.post(
  //   `/crypto/${asset}/timeseries`,
  //   { start, end, interval },
  //   { headers: buildAuthorization(authData) }
  // );
};
