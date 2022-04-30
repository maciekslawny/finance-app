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
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import EditModal from "./EditModal";
import ButtonGroup from "@mui/material/ButtonGroup";

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

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [appState, setAppState] = useState({
    finances: [],
  });

  useEffect(() => {
    axiosInstance.get(`finances/operations`).then((res) => {
      const newData = res.data;
      setAppState({ loading: false, finances: newData });
      console.log(res.data);
    });
  }, [props.updatedTimes]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - appState.finances.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (event) => {
    const res = axiosInstance
      .delete(`finances/operations/${event.currentTarget.id}`)
      .then(() => props.setUpdatedTimes(props.updatedTimes + 1));
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
              <Typography className={classes.tableHead}>Type</Typography>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <Typography className={classes.tableHead}>Date</Typography>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <Typography className={classes.tableHead}>Amount</Typography>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <Typography className={classes.tableHead}>Options</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? appState.finances.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : appState.finances
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.operation_type}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.operation_date}
              </TableCell>
              <TableCell
                className={
                  row.operation_type == "expense"
                    ? classes.expense
                    : classes.revenue
                }
                style={{ width: 160 }}
                align="right"
              >
                {row.operation_type == "expense" ? "-" : "+"}
                {row.amount} {row.operation_currency}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <DeleteIcon
                    id={row.id}
                    className={classes.iconButton}
                    fontSize="small"
                    onClick={handleDelete}
                  />
                  <EditModal
                    itemId={row.id}
                    updatedTimes={props.updatedTimes}
                    setUpdatedTimes={props.setUpdatedTimes}
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
              count={appState.finances.length}
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
