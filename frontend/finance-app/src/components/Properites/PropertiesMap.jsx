import React, { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import 'leaflet/dist/leaflet.css';
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { Icon } from 'leaflet'
import marker from './home.png';
import axiosInstance from "../../axios";
import PropertiesMapTable from "./PropertiesMapTable";

const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [27,27]
   })

const useStyles = makeStyles((theme) => ({
    map: {
      height: 650,
      marginTop: 100,
    },
  }));

function PropertiesMap() {
  const [adresses, setAdresses] = useState({});
  const classes = useStyles()

  let [properties, setProperties] = useState([]);

  useEffect(() => {
    axiosInstance.get(`properties/map`).then((res) => {
        setProperties(res.data);
      console.log('tutaj', res.data)
    });
  }, [1]);




  return (
        <div>
      <MapContainer className={classes.map} center={[54.49 , 18.46]} zoom={10.5} scrollWheelZoom={true}>
  <TileLayer
    
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
    {
    properties.map((property) => (
        <Marker position={[property.latitude , property.longitude]} icon={myIcon}>
            <Popup>{property.name} {property.meters}m2, {property.price}pln</Popup>
        </Marker>

    ))}
    

</MapContainer>
    <PropertiesMapTable properties={properties}/>
    </div>
  );
}

export default PropertiesMap;