import React, {useEffect, useState} from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
  amount: {
      color: "gray",
      fontWeight: "bolder",

  },
    boxItem: {
      marginTop: 30,
    }
}));

const Amount= (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.boxItem}>
            <Typography className={classes.amount} variant={'h7'}>Amount</Typography>
            <Typography variant={'h5'}>{props.amount} {props.currency}</Typography>
        </Box>
    );
}
export default Amount;