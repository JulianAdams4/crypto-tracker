import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import API from "api";
import Storage from "lib/storage";
import { APP_ID, WEBSOCKET_URL } from "utils/constants";
import AssetsTable from "components/AssetsTable";

let searchDelayTimer = null;

function App() {
  const [authed, setAuthed] = useState(null);
  const [assetsList, setAssetsList] = useState(null);
  const [filteredList, setFilteredList] = useState(null);
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
    setAssetsList(assetsData.data);
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
    }
  }, [authed, assetsList, loadAssets]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="h-full p-[2%] bg-gray1 overflow-scroll">
      <h1 className="mt-4 mb-6 px-4">Crypto Tracker</h1>
      <AssetsTable
        data={filteredList || assetsList || []}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}

export default App;
