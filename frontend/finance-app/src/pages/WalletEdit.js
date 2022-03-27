import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import WalletTable from "./AssetTable";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router";

function WalletEdit() {
  let navigate = useNavigate();

  let [assetData, setAssetData] = useState({ operation_type: "revenue" });
  const [categoryState, setCategoryState] = useState(null);

  const pageId = useParams().id;

  useEffect(() => {
    axiosInstance.get(`finances/operations/${pageId}`).then((res) => {
      const newData = res.data;
      setAssetData(newData);
      console.log(res.data);
    });

    axiosInstance.get("finances/category").then((res) => {
      const newData = res.data;
      setCategoryState(newData);
      console.log(res.data);
    });
  }, [setAssetData]);

  function handleSubmit() {
    console.log(assetData);
    axiosInstance
      .put(`finances/operations/${pageId}/`, JSON.stringify(assetData))
      .then(navigate("/wallet"));
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
            placeholder="Enter name"
            name="name"
            onChange={handleInputChange}
            value={assetData.name}
          ></input>

          <select
            name="operation_type"
            onChange={handleInputChange}
            className="form-select form-select-lg mb-2"
            value={assetData.operation_type}
          >
            <option value="expense">Expense</option>
            <option value="revenue">Revenue</option>
          </select>
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="Enter amount"
            name="amount"
            onChange={handleInputChange}
            value={assetData.amount}
          ></input>
          <input
            type="date"
            className="form-control form-control-lg mb-2"
            placeholder="Enter operation_date"
            name="operation_date"
            onChange={handleInputChange}
            value={assetData.operation_date}
          ></input>

          <select
            name="category"
            onChange={handleInputChange}
            className="form-select form-select-lg mb-2"
            value={assetData.category}
          >
            <option>Select category</option>
            {categoryState != null &&
              categoryState.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
          </select>
        </div>
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        Edit
      </button>
    </div>
  );
}
export default WalletEdit;
