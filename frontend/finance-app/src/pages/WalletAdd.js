import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import MyInput from "./MyInput";
import MySelect from "./MySelect";

function AssetAdd() {
  let navigate = useNavigate();

  let date = {
    name: "",
    operation_type: 1,
    amount: 8,
    operation_date: "2022-02-14",
    content_type: 14,
    category: 2,
    user: null,
  };

  const [categoryState, setCategoryState] = useState(null);

  const operationTypes = [
    { id: "expense", name: "expense" },
    { id: "revenue", name: "revenue" },
  ];

  useEffect(() => {
    axiosInstance.get("finances/category").then((res) => {
      const newData = res.data;
      setCategoryState(newData);
      console.log(res.data);
    });
  }, [setCategoryState]);

  function handleSubmit() {
    console.log(date);
    axiosInstance
      .post("finances/operations/", JSON.stringify(date))
      .then(navigate("/wallet"));
  }
  function handleInputChange(event) {
    console.log(event.target.name);
    date[`${event.target.name}`] = event.target.value;
  }

  return (
    <div className="App">
      <h1>Add wallet</h1>

      <div className="m-3">
        <div className="form-group">
          <MyInput
            type="text"
            className="form-control form-control-lg mb-2"
            label="Enter name"
            name="name"
            onChange={handleInputChange}
          ></MyInput>
          <MySelect
            label="Select operation type"
            name="operation_type"
            className="form-select form-select-lg mb-2"
            options={operationTypes}
            onChange={handleInputChange}
          ></MySelect>
          <MyInput
            type="number"
            className="form-control form-control-lg mb-2"
            label="Enter amount"
            name="amount"
            onChange={handleInputChange}
          ></MyInput>
          <MyInput
            type="date"
            className="form-control form-control-lg mb-2"
            label="Enter operation_date"
            name="operation_date"
            onChange={handleInputChange}
          ></MyInput>
          <MySelect
            label="Select category"
            name="category"
            className="form-select form-select-lg mb-2"
            options={categoryState}
            onChange={handleInputChange}
          ></MySelect>
        </div>
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
}
export default AssetAdd;
