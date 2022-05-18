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
import PropertyDetaIlsTable from "./PropertyDetaIlsTable";
import { Grid } from "@material-ui/core";

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
    <Container className={classes.container} style={{textAlign: "center"}} >
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Properties</Typography>
      </Breadcrumbs>
      <Card className={classes.optionsCard}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            <Link color="inherit" href={property.offer_link}>
          {property.name}
        </Link>
        </Typography><PropertyDetaIlsTable property={property}/>
            {property.images &&
                <Grid
                  container

                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >

                  <Grid item xs={12}>
                   <PropertyGallery images={property.images}   />
                  </Grid>

                </Grid>

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
