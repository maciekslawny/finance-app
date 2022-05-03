import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import React, { useEffect, useState } from "react";
import CardTotalAmount from "./CardTotalAmount";
import axiosInstance from "../../axios";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  gridContainer: {
    justifyContent: "space-between",
    width: "100vh",
  },
  card: {
    height: 250,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [infoFinances, setInfoFinances] = useState();

  useEffect(() => {
    axiosInstance.get(`finances/asset-info`).then((res) => {
      setInfoFinances(res.data);
    });

  }, [1]);

  return (
    <Container className={classes.container}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Dashboard</Typography>
      </Breadcrumbs>
      {infoFinances &&
      <Grid container className={classes.gridContainer}>
        <Grid item sm={3}>
          <CardTotalAmount name={'Total balance'} totalAmount={infoFinances.balance} currency={infoFinances.user_currency} />
        </Grid>
        <Grid item sm={3}>
          <CardTotalAmount name={'Total wallet'} totalAmount={infoFinances.wallet_value_user_currency} currency={infoFinances.user_currency} />
        </Grid>
        <Grid item sm={3}>
        <CardTotalAmount name={'Total asset'} totalAmount={infoFinances.assets_value_user_currency} currency={infoFinances.user_currency} />
        </Grid>
      </Grid>
      }
    </Container>
  );
};

export default Dashboard;
