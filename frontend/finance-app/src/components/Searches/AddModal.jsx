import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {makeStyles, Typography} from "@material-ui/core";
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

    const distance = [0, 2, 5, 10, 15, 30, 50, 75, 100]
    const websites = ['olx', 'otodom']


    const [cities, setCities] = useState([]);

    let [assetData, setAssetData] = useState({
        phrase: "",
        max_price: null,
        min_price: 0,
        website: "olx",
        distance: 0,
        category: 'nieruchomosci/mieszkania/sprzedaz',
        city: null
    });


    useEffect(() => {
        axiosInstance.get(`properties/cities`).then((res) => {
            setCities(res.data);
        });
    }, [1]);

    function handleSubmit() {
        axiosInstance.post("properties/searches/", JSON.stringify(assetData)).then();
        props.setUpdatedTimes(props.updatedTimes + 1);
        setOpen(false);
    }

    function handleInputChange(event) {
        console.log(assetData)
        assetData[`${event.target.name}`] = event.target.value;
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
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div className="App">
                            <TextField
                                margin="dense"
                                id="phrase"
                                fullWidth
                                name="phrase"
                                label="Phrase"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                id="min_price"
                                fullWidth
                                name="min_price"
                                label="Min Price"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                id="max_price"
                                fullWidth
                                name="max_price"
                                label="Max Price"
                                variant="outlined"
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="dense"
                                fullWidth
                                name="city"
                                id="city"
                                select
                                label="Select City"
                                onChange={handleInputChange}
                            >
                                {cities.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}

                            </TextField>

                            <TextField
                                margin="dense"
                                fullWidth
                                name="distance"
                                id="distance"
                                select
                                label="Select Max Distance"
                                onChange={handleInputChange}
                            >
                                {distance.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}

                            </TextField>

                            <TextField
                                margin="dense"
                                fullWidth
                                name="website"
                                id="website"
                                select
                                label="Select Website"
                                onChange={handleInputChange}
                            >
                                {websites.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}

                            </TextField>


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
