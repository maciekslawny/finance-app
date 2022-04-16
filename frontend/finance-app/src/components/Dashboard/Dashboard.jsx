import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import React, { useEffect, useState } from "react";
import CardTotalAmount from "./CardTotalAmount";
import CardCategories from "./CardCategories";
import CardAsset from "./CardAsset";

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
  return (
    <Container className={classes.container}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Dashboard</Typography>
      </Breadcrumbs>

      <Grid container className={classes.gridContainer}>
        <Grid item sm={4}>
          <CardCategories />
        </Grid>
        <Grid item sm={3}>
          <CardTotalAmount totalAmount={15000} completePercentage={30} />
        </Grid>
        <Grid item sm={4}>
          <CardAsset />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
