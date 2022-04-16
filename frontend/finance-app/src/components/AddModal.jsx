import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles, Typography } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import axiosInstance from "../axios";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
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

export default function AddModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();

  const [categoryState, setCategoryState] = useState(null);

  let date = {
    name: "",
    operation_type: 1,
    amount: 8,
    operation_date: "2022-02-14",
    content_type: 14,
    category: 2,
    user: null,
  };

  useEffect(() => {
    axiosInstance.get("finances/category").then((res) => {
      const newData = res.data;
      setCategoryState(newData);
      console.log(res.data);
    });
  }, [1]);

  function handleSubmit() {
    axiosInstance.post("finances/operations/", JSON.stringify(date)).then();
    props.setUpdatedTimes(props.updatedTimes + 1);
    setOpen(false);
  }

  function handleInputChange(event) {
    console.log(event.target.name);
    date[`${event.target.name}`] = event.target.value;
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Add new
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add operation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="App">
              <TextField
                margin="dense"
                id="name"
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                onChange={handleInputChange}
              />

              <TextField
                margin="dense"
                fullWidth
                name="operation_type"
                id="outlined-select-currency"
                select
                label="Select type"
                onChange={handleInputChange}
              >
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="revenue">Revenue</MenuItem>
              </TextField>

              <TextField
                margin="dense"
                type="number"
                id="amount"
                fullWidth
                name="amount"
                label="Amount"
                variant="outlined"
                onChange={handleInputChange}
              />

              <input
                type="date"
                className="form-control form-control-lg mb-1 mt-1"
                placeholder="Enter operation_date"
                name="operation_date"
                onChange={handleInputChange}
              ></input>

              {categoryState != null && (
                <TextField
                  margin="dense"
                  fullWidth
                  name="category"
                  id="outlined-select-currency"
                  select
                  label="Select category"
                  onChange={handleInputChange}
                >
                  {categoryState.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <Button variant="contained" onClick={handleSubmit}>
                Edit
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
