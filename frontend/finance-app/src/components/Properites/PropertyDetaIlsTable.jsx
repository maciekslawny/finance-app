import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "@material-ui/core/Link";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function PropertyDetaIlsTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell align="right">Meters</TableCell>
            <TableCell align="right">Price/m2</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {props.property.price} PLN
              </TableCell>
              <TableCell align="right">{props.property.meters} m2</TableCell>
              <TableCell align="right">{props.property.price_per_meter} PLN</TableCell>
              <TableCell align="right">{props.property.city_name}</TableCell>
              <TableCell align="right"><Link color="inherit" href={props.property.offer_link}>
          offer link
        </Link></TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}