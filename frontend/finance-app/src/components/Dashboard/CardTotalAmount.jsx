import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import ProgressBar from "./ProgressBar";
import Divider from '@mui/material/Divider';
import Amount from "./Amount";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 250,
    borderRadius: '4%',
    borderTop: 5,

  },
  headerName: {
    paddingBottom: 5,
  }
}));

const CardTotalAmount = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography  className={classes.headerName} component="div" variant="h5">
          <Grid container justifyContent = "center">
          {props.name}
          </Grid>
        </Typography>
        <Divider />
        <Grid container
          direction="column"
          justifyContent="center" alignItems="center">
        <Typography component="p" variant="h5">
        </Typography>
          <Amount amount={props.totalAmount} currency={props.currency}/>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardTotalAmount;
