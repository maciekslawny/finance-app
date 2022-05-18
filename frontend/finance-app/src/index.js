import React, {useState} from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./register";
import SignIn from "./login";
import Logout from "./logout";
import Navbar from "./components/Navbar";
import WalletPage from "./components/Wallet/WalletPage";
import { Grid } from "@material-ui/core";
import Leftbar from "./components/Leftbar";
import Dashboard from "./components/Dashboard/Dashboard";
import AssetPage from "./components/Asset/AssetPage";
import PropertiesMap from "./components/Properites/PropertiesMap";
import PropertiesBase from "./components/Properites/PropertiesBase";
import PropertyDetails from "./components/Properites/PropertyDetails";
import SearchesBase from "./components/Searches/SearchesBase";
import UserSettings from "./components/UserSettings/UserSettings";
import PrivateRoute from "./ultis/PrivateRoute";

render(
    <BrowserRouter>
      {/* <Header /> */}
      <div>
        <Navbar/>
        <Grid container>
          <Grid item sm={2} xs={2}>
            <Leftbar/>
          </Grid>
          <Grid item sm={10} xs={10}>
            <Routes>
              <Route path="/" element={
                <PrivateRoute >
                  <Dashboard/>
                </PrivateRoute>}/>}/>
              <Route path="wallet/" element={
                <PrivateRoute>
                  <WalletPage/>
                </PrivateRoute>}/>
              <Route path="/assetnew" element={
                <PrivateRoute>
                  <AssetPage/>
                </PrivateRoute>}/>
              <Route path="/properties-map" element={
                <PrivateRoute >
                  <PropertiesMap/>
                </PrivateRoute>}/>}/>
              <Route path="/properties" element={
                <PrivateRoute >
                  <PropertiesBase/>
                </PrivateRoute>}/>}/>
              <Route path="/properties/:id" element={
                <PrivateRoute>
                  <PropertyDetails/>
                </PrivateRoute>}/>}/>
              <Route path="/searches" element={
                <PrivateRoute>
                  <SearchesBase/>
                </PrivateRoute>}/>}/>
              <Route path="/user-settings" element={
                <PrivateRoute>
                  <UserSettings/>
                </PrivateRoute>
                }/>
              <Route path="/register" element={<SignUp/>}/>
              <Route path="/login" element={<SignIn/>}/>
              <Route path="/logout" element={<Logout/>}/>
            </Routes>
          </Grid>
        </Grid>
      </div>
    </BrowserRouter>,
    document.getElementById("root")
);

