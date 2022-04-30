import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles, Typography } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import axiosInstance from "../../axios";

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


  let [currencyData, setCurrencyData] = useState([]);
  let [metalData, setMetalData] = useState([]);
  let [cryptocurrencyData, setCryptocurrencyData] = useState([]);
  let [selectedType, setSelectedType] = useState([]);

  let [assetData, setAssetData] = useState({
    tag: "zapi",
    object_id: 1,
    amount: 8,
    content_type: 1,
  });

  const assetTypes = [
    { id: 12, name: "Cryptocurency" },
    { id: 13, name: "Currency" },
    { id: 14, name: "Metals" },
  ];

  useEffect(() => {
    axiosInstance.get(`api-data/currency/`).then((res) => {
      setCurrencyData(res.data);
    });
    axiosInstance.get(`api-data/metal/`).then((res) => {
      setMetalData(res.data);
    });
    axiosInstance.get(`api-data/cryptocurrency/`).then((res) => {
      setCryptocurrencyData(res.data);
    });
  }, [assetData]);

  function handleSubmit() {
    axiosInstance.post("finances/asset/", JSON.stringify(assetData)).then();
    // props.setUpdatedTimes(props.updatedTimes + 1);
    setSelectedType([])
    setOpen(false);
  }


  function checkSelectedAssetTypes (){
    if (assetData.content_type == 12) {
      setSelectedType(cryptocurrencyData);
    } else if (assetData.content_type == 13) {
      setSelectedType(currencyData);
    } else if (assetData.content_type == 14) {
      setSelectedType(metalData);
    }
  };

  function handleInputChange(event) {
    assetData[`${event.target.name}`] = event.target.value;
    checkSelectedAssetTypes ()
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
                id="tag"
                fullWidth
                name="tag"
                label="Tag"
                variant="outlined"
                onChange={handleInputChange}
              />
              {assetTypes != null && (
                <TextField
                  margin="dense"
                  fullWidth
                  name="content_type"
                  id="outlined-select-currency"
                  select
                  label="Select category"
                  onChange={handleInputChange}
                >
                  {assetTypes.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {assetTypes != null && (
                <TextField
                  margin="dense"
                  fullWidth
                  name="object_id"
                  id="outlined-select-currency"
                  select
                  label="Select category"
                  onChange={handleInputChange}
                >
                 
                 {selectedType.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}


                </TextField>
              )}

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
