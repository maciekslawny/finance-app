import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import WalletTable from "./WalletTable";

function WalletBase() {
  const [appState, setAppState] = useState({
    finances: null,
  });

  useEffect(() => {
    axiosInstance.get("finances/operations").then((res) => {
      const newData = res.data;
      setAppState({ loading: false, finances: newData });
      console.log(res.data);
    });
  }, [setAppState]);
  return (
    <div className="App">
      {appState.finances == null ? (
        <h2>
          <b>Loading...</b>
        </h2>
      ) : (
        <WalletTable items={appState.finances} />
      )}
    </div>
  );
}
export default WalletBase;
