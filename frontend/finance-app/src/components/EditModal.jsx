import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles, Typography } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import axiosInstance from "../axios";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import EditIcon from "@mui/icons-material/Edit";

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

export default function EditModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();

  const [categoryState, setCategoryState] = useState(null);
  let [assetData, setAssetData] = useState({ operation_type: "revenue" });

  useEffect(() => {
    axiosInstance.get(`finances/operations/${props.itemId}`).then((res) => {
      const newData = res.data;
      setAssetData(newData);
    });
    axiosInstance.get("finances/category").then((res) => {
      const newData = res.data;
      setCategoryState(newData);
      console.log(res.data);
    });
  }, [1]);

  function handleSubmit() {
    console.log(assetData);
    axiosInstance
      .put(`finances/operations/${props.itemId}/`, JSON.stringify(assetData))
      .then();
    props.setUpdatedTimes(props.updatedTimes + 1)
    setOpen(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <EditIcon className={classes.iconButton} fontSize="small" onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Operation
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
                value={assetData.name}
                onChange={handleInputChange}
              />

              <TextField
                margin="dense"
                fullWidth
                name="operation_type"
                id="outlined-select-currency"
                select
                label="Select type"
                value={assetData.operation_type}
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
                value={assetData.amount}
                onChange={handleInputChange}
              />

              <input
                type="date"
                className="form-control form-control-lg mb-1 mt-1"
                placeholder="Enter operation_date"
                name="operation_date"
                onChange={handleInputChange}
                value={assetData.operation_date}
              ></input>

              {categoryState != null && (
                <TextField
                  margin="dense"
                  fullWidth
                  name="category"
                  id="outlined-select-currency"
                  select
                  label="Select category"
                  value={assetData.category}
                  onChange={handleInputChange}
                >
                  {categoryState.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <Button variant="contained" onClick={handleSubmit}>Add</Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
