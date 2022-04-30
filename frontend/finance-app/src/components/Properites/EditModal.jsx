import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles, Typography } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import axiosInstance from "../../axios";

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

  let [currencyData, setCurrencyData] = useState([]);
  let [metalData, setMetalData] = useState([]);
  let [cryptocurrencyData, setCryptocurrencyData] = useState([]);
  let [selectedType, setSelectedType] = useState(null);

  const classes = useStyles();

  const assetTypes = [
    { id: 12, name: "Cryptocurency" },
    { id: 13, name: "Currency" },
    { id: 14, name: "Metals" },
  ];

  let [assetData, setAssetData] = useState([]);

  function checkSelectedAssetTypes (inputData){
    if (inputData == 12) {
      setSelectedType(cryptocurrencyData);
    } else if (inputData == 13) {
      setSelectedType(currencyData);
    } else if (inputData == 14) {
      setSelectedType(metalData);
    }
  };

  useEffect(() => {

    axiosInstance.get(`api-data/currency/`).then((res) => {
      setCurrencyData(res.data);
    });
    axiosInstance.get(`api-data/metal/`).then((res) => {
      setMetalData(res.data);
      setSelectedType(res.data);
    });
    axiosInstance.get(`api-data/cryptocurrency/`).then((res) => {
      setCryptocurrencyData(res.data);
    });

    axiosInstance.get(`finances/asset/${props.itemId}`).then((res) => {
      setAssetData(res.data);
      checkSelectedAssetTypes(res.data.content_type)
    });



  }, [1]);

  function handleSubmit() {
    console.log(assetData);
    axiosInstance
      .put(`finances/asset/${props.itemId}/`, JSON.stringify(assetData))
      .then();
    setOpen(false);
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    checkSelectedAssetTypes (assetData.content_type)
  };


  return (
    <div>
      <EditIcon
        className={classes.iconButton}
        fontSize="small"
        onClick={handleOpen}
      />
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
                id="tag"
                fullWidth
                value={assetData.tag}
                name="tag"
                label="Tag"
                variant="outlined"
                onChange={handleInputChange}
              />
              {assetTypes != null && (
                <TextField
                  margin="dense"
                  fullWidth
                  value={assetData.content_type}
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

              {assetData.content_type == 12 && (
                <TextField
                  margin="dense"
                  fullWidth
                  value={assetData.object_id}
                  name="object_id"
                  id="outlined-select-currency"
                  select
                  label="Select category"
                  onChange={handleInputChange}
                >
                 
                 {cryptocurrencyData.map((option) => (
                    <MenuItem key={option.id} value={option.id} >
                      {option.name}
                    </MenuItem>
                  ))}

                </TextField>
              )}

              {assetData.content_type == 13 && (
                <TextField
                  margin="dense"
                  fullWidth
                  value={assetData.object_id}
                  name="object_id"
                  id="outlined-select-currency"
                  select
                  label="Select category"
                  onChange={handleInputChange}
                >
                 {currencyData.map((option) => (
                    <MenuItem key={option.id} value={option.id} >
                      {option.name}
                    </MenuItem>
                  ))}

                </TextField>
              )}
              {assetData.content_type == 14 && (
                <TextField
                  margin="dense"
                  fullWidth
                  value={assetData.object_id}
                  name="object_id"
                  id="outlined-select-currency"
                  select
                  label="Select category"
                  onChange={handleInputChange}
                >
                 {metalData.map((option) => (
                    <MenuItem key={option.id} value={option.id} >
                      {option.name}
                    </MenuItem>
                  ))}

                </TextField>
              )}



              <TextField
                margin="dense"
                type="number"
                id="amount"
                value={assetData.amount}
                fullWidth
                name="amount"
                label="Amount"
                variant="outlined"
                onChange={handleInputChange}
              />



            
          
              <Button variant="contained" onClick={handleSubmit}>
                Add
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
