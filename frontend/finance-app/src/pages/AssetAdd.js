import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import WalletTable from "./AssetTable";
import MyInput from "./MyInput";
import MySelect from "./MySelect";

function AssetAdd() {
  let [currencyData, setCurrencyData] = useState([]);
  let [metalData, setMetalData] = useState([]);
  let [cryptocurrencyData, setCryptocurrencyData] = useState([]);

  let [assetData, setAssetData] = useState({
    tag: "zapi",
    object_id: 1,
    amount: 8,
    content_type: 1,
  });

  const assetTypes = [
    { id: 12, name: "Cryptocurency" },
    { id: 13, name: "Currency" },
    { id: 14, name: "Metals" },
  ];

  useEffect(() => {
    axiosInstance.get(`api-data/currency/`).then((res) => {
      const newData = res.data;
      setCurrencyData(newData);
      console.log(res.data);
    });

    axiosInstance.get(`api-data/metal/`).then((res) => {
      const newData = res.data;
      setMetalData(newData);
      console.log(res.data);
    });
    axiosInstance.get(`api-data/cryptocurrency/`).then((res) => {
      const newData = res.data;
      setCryptocurrencyData(newData);
      console.log(res.data);
    });
  }, [assetTypes]);

  function handleSubmit() {
    console.log(assetData);
    axiosInstance.post("finances/asset/", JSON.stringify(assetData)).then();
  }

  const checkSelectedAssetTypes = (e) => {
    let result = [];
    if (assetData.content_type == 12) {
      return cryptocurrencyData;
    } else if (assetData.content_type == 13) {
      return currencyData;
    } else if (assetData.content_type == 14) {
      return metalData;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      <h1>Add wallet</h1>

      <div className="m-3">
        <div className="form-group">
          <MyInput
            type="text"
            className="form-control form-control-lg mb-2"
            label="Enter tag"
            name="tag"
            onChange={handleInputChange}
          ></MyInput>
          <MySelect
            label="Select content type"
            name="content_type"
            className="form-select form-select-lg mb-2"
            options={assetTypes}
            onChange={handleInputChange}
          ></MySelect>

          <MySelect
            label="Select object"
            name="object_id"
            className="form-select form-select-lg mb-2"
            options={checkSelectedAssetTypes()}
            onChange={handleInputChange}
          ></MySelect>

          <MyInput
            type="number"
            className="form-control form-control-lg mb-2"
            label="Enter amount"
            name="amount"
            onChange={handleInputChange}
          ></MyInput>
        </div>
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
}
export default AssetAdd;
