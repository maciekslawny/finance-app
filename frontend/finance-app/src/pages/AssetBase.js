import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import WalletTable from "./AssetTable";

function AssetBase() {
  const [appState, setAppState] = useState({
    data: null,
  });
  const [assetList, setAssetList] = useState({
    data: null,
  });

  useEffect(() => {
    axiosInstance.get("finances/asset-info").then((res) => {
      const newData = res.data;
      setAppState({ loading: false, data: newData });
      console.log(res.data);
    });

    axiosInstance.get("finances/asset").then((res) => {
      const newData = res.data;
      setAssetList({ loading: false, data: newData });
      console.log(res.data);
    });
  }, [1]);
  return (
    <div className="App">
      {appState.data == null || assetList.data == null ? (
        <h2>
          <b>Loading...</b>
        </h2>
      ) : (
        <WalletTable items={appState.data} assetList={assetList.data} />
      )}
    </div>
  );
}
export default AssetBase;
