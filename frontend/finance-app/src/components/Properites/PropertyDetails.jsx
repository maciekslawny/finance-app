import { Container, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import PropertyGallery from "./PropertyGallery";

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

const PropertyDetails = () => {
    const [property, setProperty] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        axiosInstance.get(`properties/all/${id}/`).then((res) => {
            setProperty(res.data);
        });
        }, [1]);

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Properties</Typography>
      </Breadcrumbs>
      <Card className={classes.optionsCard}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {property.name}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
        {property.price} PLN, {property.meters} m2
        </Typography>
            {property.images &&
                <PropertyGallery images={property.images} />
            }
            
            <Typography gutterBottom component="div">
        {property.description}
        </Typography>
        </CardContent>
        
      </Card>
      
     
    </Container>
  );
};

export default PropertyDetails;
