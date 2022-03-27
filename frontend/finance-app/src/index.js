import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./register";
import SignIn from "./login";
import Logout from "./logout";
import Header from "./header";
import AssetBase from "./pages/AssetBase";
import AssetAdd from "./pages/AssetAdd";
import AssetEdit from "./pages/AssetEdit";
import WalletAdd from "./pages/WalletAdd";
import WalletBase from "./pages/WalletBase";
import WalletEdit from "./pages/WalletEdit";
import Chart from "./pages/Chart";
import Dashboard from "./pages/Dashboard";
import ProfileEdit from "./pages/ProfileEdit";

render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="wallet/" element={<WalletBase />} />
      <Route path="wallet/add" element={<WalletAdd />} />
      <Route path="wallet/:id" element={<WalletEdit />} />
      <Route path="/asset" element={<AssetBase />} />
      <Route path="/asset/add" element={<AssetAdd />} />
      <Route path="/asset/:id" element={<AssetEdit />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/edit-profile" element={<ProfileEdit />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);