import { useEffect, useState } from "react";
import { getTopAssets } from "api/currencies";
import logo from "assets/logo.svg";
import "./App.css";

function App() {
  const [cryptoAssetsData, setCryptoAssetsData] = useState(null);

  const loadData = async () => {
    const topAssets = await getTopAssets();
    console.log("topAssets: ", topAssets);
    setCryptoAssetsData(topAssets);
  };

  useEffect(() => {
    if (!cryptoAssetsData) {
      loadData();
    }
  }, [cryptoAssetsData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </header>
    </div>
  );
}

export default App;
