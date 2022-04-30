import React, { useEffect, useState } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import PropertiesTable from "./PropertiesTable";
import PropertiesTableNew from "./PropertiesTableNew";

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

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}



const rows = [
  createData('tether', 'cryptocurrency', 15500, 15500),
  createData('Polish zloty', '	currency', 400, 93.96),
];

export default function PropertiesBase(props) {
  let [ownedAssets, setOwnedAssets] = useState([]);
  const classes = useStyles();

  return (
  <div>
      <Container className={classes.container}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Properties</Typography>
      </Breadcrumbs>
      <PropertiesTableNew/>
      <Card className={classes.optionsCard}>
        <CardContent>
        </CardContent>
      </Card>
     <PropertiesTable/>
    </Container>
  </div>
  );
}