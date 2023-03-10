import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import API from "api";
import Storage from "lib/storage";
import {
  APP_ID,
  REQUIRED_ASSETS,
  TREND_DAYS,
  WEBSOCKET_URL,
} from "utils/constants";
import AssetsTable from "components/AssetsTable";
import { getFormattedDate, getPreviousDate } from "utils/formatter";

let searchDelayTimer = null;

function App() {
  const [authed, setAuthed] = useState(null);
  const [assetsList, setAssetsList] = useState(null);
  const [filteredList, setFilteredList] = useState(null);
  const [assetsSeries, setAssetsSeries] = useState({});
  const [search, setSearch] = useState("");

  const { lastJsonMessage } = useWebSocket(`${WEBSOCKET_URL}?appId=${APP_ID}`);

  const checkAuth = useCallback(async () => {
    const prevAuth = Storage.getItem("authData");
    if (!prevAuth) {
      const authData = await API.Crypto.getAutoSingIn(APP_ID);
      if (authData.data.token) {
        Storage.setItem("authData", authData.data.token);
        setAuthed(authData.data.token);
      }
    } else if (prevAuth) {
      setAuthed(prevAuth);
    }
  }, []);

  const loadAssets = useCallback(async () => {
    const assetsData = await API.Crypto.getTopAssets(authed);
    console.log('Loaded assetsData: ', assetsData)
    setAssetsList(assetsData.data);
  }, [authed]);

  const loadSeries = useCallback(async () => {
    const assetsTimeseries = await Promise.all(
      Object.values(REQUIRED_ASSETS).map((slug) =>
        API.Crypto.getAssetTimeseries(authed, {
          start: getFormattedDate(getPreviousDate(TREND_DAYS + 1)),
          end: getFormattedDate(getPreviousDate(1)),
          interval: "1d",
          asset: slug,
        })
      )
    );
    const formattedSeries = {};
    for (const timeserie of assetsTimeseries) {
      const formattedSingle = timeserie.data.values.map((pair) => pair[1]);
      formattedSeries[timeserie.data.slug] = formattedSingle;
    }
    setAssetsSeries(formattedSeries);
  }, [authed]);

  const submitSearch = useCallback(
    (customList) => {
      let filtered = null;
      if (search) {
        filtered = (customList || assetsList).filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (!customList) {
        setFilteredList(filtered);
      }
      return filtered;
    },
    [search, assetsList]
  );

  useEffect(() => {
    if (search && lastJsonMessage && lastJsonMessage.length) {
      const webSocketFiltered = submitSearch(lastJsonMessage);
      return setFilteredList(webSocketFiltered);
    } else if (lastJsonMessage && lastJsonMessage.length) {
      setAssetsList(lastJsonMessage);
    }
  }, [lastJsonMessage, submitSearch, search]);

  useEffect(() => {
    clearTimeout(searchDelayTimer);
    searchDelayTimer = setTimeout(() => {
      submitSearch();
    }, 1000);
  }, [search, submitSearch]);

  useEffect(() => {
    if (authed && assetsList === null) {
      loadAssets();
      loadSeries();
    }
  }, [authed, assetsList, loadAssets, loadSeries]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log('filteredList: ', filteredList)
  console.log('assetsList: ', assetsList)
  return (
    <div className="h-full p-[2%] bg-gray1 overflow-scroll">
      <h1 className="mt-4 mb-6 px-4">Crypto Tracker</h1>
      <AssetsTable
        data={filteredList || assetsList || []}
        search={search}
        setSearch={setSearch}
        series={assetsSeries}
      />
    </div>
  );
}

export default App;
