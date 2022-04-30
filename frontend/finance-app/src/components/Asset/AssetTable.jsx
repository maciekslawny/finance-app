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

export default function AssetTable() {
  let [ownedAssets, setOwnedAssets] = useState([]);

  useEffect(() => {
    axiosInstance.get(`finances/asset-info`).then((res) => {
      setOwnedAssets(res.data.assets);
      console.log('tutaj', res.data.assets)
    });
  }, [1]);
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Category</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


              {Object.entries(ownedAssets).map((asset_category) => {
                return Object.entries(asset_category[1]).map((asset_type) => (
              <TableRow>
                <TableCell>{asset_type[0]}</TableCell>
                <TableCell >{asset_category[0]}</TableCell>
                <TableCell align="right">{asset_type[1].amount}</TableCell>
                <TableCell align="right">{asset_type[1].value}</TableCell>
              </TableRow>
                ));
              })}       

        
        </TableBody>
      </Table>
    </TableContainer>
  );
}