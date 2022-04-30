import { Container, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import React, { useEffect, useState } from "react";
import AssetTable from "./AssetTable";
import AddModal from "./AddModal";
import AssetTableItems from "./AssetTableItems";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  breadcrumbs: {
    marginBottom: 10,
  },
  card: {
    marginBottom: 30,
  },
  media: {
    height: 140,
  },
  optionsCard :{
      marginTop: 15,
      marginBottom: 15,
  }
}));

const AssetPage = () => {
  const [updatedTimes, setUpdatedTimes] = useState(0);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Asset</Typography>
      </Breadcrumbs>
      <AssetTable/>
      <Card className={classes.optionsCard}>
        <CardContent>
            <AddModal
          />
        </CardContent>
      </Card>
      <AssetTableItems/>
     
    </Container>
  );
};

export default AssetPage;
