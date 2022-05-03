import React, { useEffect, useState } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import axiosInstance from "../../axios";
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
  const [propertiesNew, setPropertiesNew] = useState([]);
  const [propertiesOld, setPropertiesOld] = useState([]);
  const classes = useStyles();
  const [updatedTimes, setUpdatedTimes] = useState(0);

  useEffect(() => {
    axiosInstance.get(`properties/new`).then((res) => {
      setPropertiesNew(res.data);
    });
    axiosInstance.get(`properties/old`).then((res) => {
      setPropertiesOld(res.data);
    });
  }, [updatedTimes]);

  return (
  <div>
      <Container className={classes.container}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Properties</Typography>
      </Breadcrumbs>
      {propertiesNew.length > 0 &&
      <PropertiesTableNew properties={propertiesNew} updatedTimes={updatedTimes} setUpdatedTimes={setUpdatedTimes}/>
      }
      <Card className={classes.optionsCard}>
        <CardContent>
        </CardContent>
      </Card>
     <PropertiesTable properties={propertiesOld} updatedTimes={updatedTimes} setUpdatedTimes={setUpdatedTimes}/>
    </Container>
  </div>
  );
}