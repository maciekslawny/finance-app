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
// import Dashboard from "./pages/Dashboard";
import ProfileEdit from "./pages/ProfileEdit";
import Navbar from "./components/Navbar";
import WalletPage from "./components/Wallet/WalletPage";
import { Grid } from "@material-ui/core";
import Leftbar from "./components/Leftbar";
import Dashboard from "./components/Dashboard/Dashboard";
import AssetPage from "./components/Asset/AssetPage";
import PropertiesMap from "./components/Properites/PropertiesMap";
import PropertiesBase from "./components/Properites/PropertiesBase";
import PropertyDetails from "./components/Properites/PropertyDetails";

render(
  <BrowserRouter>
    {/* <Header /> */}
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Routes>
            <Route path="/testsite" element={<WalletPage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="wallet/" element={<WalletPage />} />
            <Route path="wallet/add" element={<WalletAdd />} />
            <Route path="wallet/:id" element={<WalletEdit />} />
            <Route path="/asset" element={<AssetBase />} />
            <Route path="/assetnew" element={<AssetPage />} />
            <Route path="/asset/add" element={<AssetAdd />} />
            <Route path="/asset/:id" element={<AssetEdit />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/edit-profile" element={<ProfileEdit />} />
            <Route path="/properties-map" element={<PropertiesMap />} />
            <Route path="/properties" element={<PropertiesBase />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
