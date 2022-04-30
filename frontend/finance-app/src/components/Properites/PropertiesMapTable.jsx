import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from "../../axios";

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}



const rows = [
  createData('tether', 'cryptocurrency', 15500, 15500),
  createData('Polish zloty', '	currency', 400, 93.96),
];

export default function PropertiesMapTable(props) {
  let [ownedAssets, setOwnedAssets] = useState([]);
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Price</TableCell>
            <TableCell align="right">Meters</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {
    props.properties.map((property) => (
        <TableRow>
        <TableCell>{property.name}</TableCell>
        <TableCell >{property.price} pln</TableCell>
        <TableCell align="right">{property.meters} m2</TableCell>
        <TableCell align="right">{property.id}</TableCell>
      </TableRow>

    ))}


        
        </TableBody>
      </Table>
    </TableContainer>
  );
}