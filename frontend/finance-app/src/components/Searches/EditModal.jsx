import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {makeStyles, Typography} from "@material-ui/core";
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

    const classes = useStyles();

    const distance = [0, 2, 5, 10, 15, 30, 50, 75, 100]
    const websites = ['olx', 'otodom']
    const [cities, setCities] = useState([]);

    let [search, setSearch] = useState([]);


    useEffect(() => {


        axiosInstance.get(`properties/searches/${props.itemId}`).then((res) => {
            setSearch(res.data);
        });


        axiosInstance.get(`properties/cities`).then((res) => {
            setCities(res.data);
        });

    }, [1]);

    function handleSubmit() {
        axiosInstance
            .put(`properties/searches/${props.itemId}/`, JSON.stringify(search))
            .then();
        setOpen(false);
        props.setUpdatedTimes(props.updatedTimes + 1)
    }


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSearch((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div className="App">
                            <TextField
                                margin="dense"
                                id="phrase"
                                fullWidth
                                name="phrase"
                                value={search.phrase}
                                label="Phrase"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                id="min_price"
                                fullWidth
                                name="min_price"
                                value={search.min_price}
                                label="Min Price"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                id="max_price"
                                fullWidth
                                value={search.max_price}
                                name="max_price"
                                label="Max Price"
                                variant="outlined"
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="dense"
                                fullWidth
                                name="city"
                                value={search.city}
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
                                value={search.distance}
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
                                value={search.website}
                                select
                                label="Select site"
                                onChange={handleInputChange}
                            >
                                {websites.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}

                            </TextField>


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
