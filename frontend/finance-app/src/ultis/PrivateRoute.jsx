import React, {useContext, useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axiosInstance from "../axios";

function PrivateRoute({ children }) {

  let [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    axiosInstance.get(`accounts/is-authorized/`).then((res) => {
      setIsAuthorized(res.data)
    });
  }, [1]);

  if (!isAuthorized) return null;
  return isAuthorized.authorized ? children : <Navigate to="/login" />;

}

export default PrivateRoute;