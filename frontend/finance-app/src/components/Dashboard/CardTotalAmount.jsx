import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import ProgressBar from "./ProgressBar";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 250,
  },
}));

const CardTotalAmount = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="p" variant="h6">
          Total amount
        </Typography>
        <Typography component="p" variant="h4">
          {props.totalAmount} USD
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          on 15 March, 2019
        </Typography>

        <ProgressBar completePercentage={props.completePercentage} />
      </CardContent>
    </Card>
  );
};

export default CardTotalAmount;
