import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import WalletTable from "./AssetTable";

import { useParams } from "react-router";

function AssetEdit() {
  let [currencyData, setCurrencyData] = useState([]);
  let [metalData, setMetalData] = useState([]);
  let [cryptocurrencyData, setCryptocurrencyData] = useState([]);

  let [assetData, setAssetData] = useState({
    tag: "zapi",
    object_id: 1,
    amount: 8,
    content_type: 1,
  });

  const pageId = useParams().id;

  useEffect(() => {
    axiosInstance.get(`finances/asset/${pageId}`).then((res) => {
      const newData = res.data;
      setAssetData(newData);
      console.log(res.data);
    });

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
  }, [setAssetData]);

  function handleSubmit() {
    console.log(assetData);
    axiosInstance
      .put(`finances/asset/${pageId}/`, JSON.stringify(assetData))
      .then();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      <h1>Edit</h1>

      <div className="m-3">
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="Enter tag"
            name="tag"
            onChange={handleInputChange}
            value={assetData.tag}
          ></input>
          <select
            name="content_type"
            onChange={handleInputChange}
            className="form-select form-select-lg mb-2"
            value={assetData.content_type}
          >
            <option>Select type</option>
            <option value={12}>Cryptocurency</option>
            <option value={13}>Currency</option>
            <option value={14}>Metals</option>
          </select>

          <select
            name="object_id"
            onChange={handleInputChange}
            className="form-select form-select-lg mb-2"
            value={assetData.object_id}
          >
            <option>Select type</option>
            {assetData.content_type == 13 &&
              currencyData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            {assetData.content_type == 14 &&
              metalData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            {assetData.content_type == 12 &&
              cryptocurrencyData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>

          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="Enter amount"
            name="amount"
            onChange={handleInputChange}
            value={assetData.amount}
          ></input>
        </div>
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        Edit
      </button>
    </div>
  );
}
export default AssetEdit;
