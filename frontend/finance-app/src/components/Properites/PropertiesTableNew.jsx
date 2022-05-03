// import * as React from 'react';
import React, { useEffect, useState } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import axiosInstance from "../../axios";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from '@mui/material/Link';

const useStyles = makeStyles((theme) => ({
  expense: {
    backgroundColor: "#ffe6e6",
  },
  revenue: {
    backgroundColor: "#f5fff2",
  },
  tableHead: {
    fontWeight: "bold",
  },
  iconButton: {
    marginRight: 5,
    color: "gray",
    cursor: "default",
    "&:hover": {
      cursor: "pointer",
      color: "black",
    },
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function PropertiesTableNew(props) {
  const classes = useStyles();
  const [item, setItem] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.properties.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function update(id, item){
    axiosInstance
        .put(`properties/all/${id}/`, JSON.stringify(item))
        .then(props.setUpdatedTimes(props.updatedTimes+1));
  }
  
  const handleAccept = (event) => {
    let item = null;
    let id = event.currentTarget.id;
    axiosInstance
      .get(`properties/new/${event.currentTarget.id}/`)
      .then((res) => {
        item = res.data;
        item.new = false
        update(id, item)
      });
  };
  const handleDelete = (event) => {
    let item = null;
    let id = event.currentTarget.id;
    axiosInstance
      .get(`properties/new/${event.currentTarget.id}/`)
      .then((res) => {
        item = res.data;
        item.deleted = true
        update(id, item)
      });
  };

  const handleAcceptFavorite = (event) => {
    let item = null;
    let id = event.currentTarget.id;
    axiosInstance
      .get(`properties/new/${event.currentTarget.id}/`)
      .then((res) => {
        item = res.data;
        item.new = false
        item.favorite = true
        update(id, item)
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              <Typography className={classes.tableHead}>Name</Typography>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <Typography className={classes.tableHead}>Price</Typography>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <Typography className={classes.tableHead}>Meters</Typography>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <Typography className={classes.tableHead}>City</Typography>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <Typography className={classes.tableHead}>Options</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? props.properties.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : props.properties
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link href={'/properties/' + row.id} variant="body2">
                  {row.name}
                </Link>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.meters}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.city}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <FavoriteBorderIcon
                    id={row.id}
                    className={classes.iconButton}
                    fontSize="small"
                    onClick={handleAcceptFavorite}
                  />

                  <CheckIcon
                    id={row.id}
                    className={classes.iconButton}
                    fontSize="small"
                    onClick={handleAccept}
                  />
                  <DeleteIcon
                    id={row.id}
                    className={classes.iconButton}
                    fontSize="small"
                    onClick={handleDelete}
                  />
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={props.properties.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
