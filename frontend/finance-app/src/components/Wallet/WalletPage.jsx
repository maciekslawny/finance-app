import { Container, makeStyles, Typography } from "@material-ui/core";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import AddModal from "./AddModal";
import React, { useEffect, useState } from "react";

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
}));

const WalletPage = () => {
  const [updatedTimes, setUpdatedTimes] = useState(0);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Wallet</Typography>
      </Breadcrumbs>
      <Card className={classes.card}>
        <CardContent>
          <AddModal
            updatedTimes={updatedTimes}
            setUpdatedTimes={setUpdatedTimes}
          />
        </CardContent>
      </Card>
      <CustomPaginationActionsTable
        updatedTimes={updatedTimes}
        setUpdatedTimes={setUpdatedTimes}
      />
    </Container>
  );
};

export default WalletPage;
