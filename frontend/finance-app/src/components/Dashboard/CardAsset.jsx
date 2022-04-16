import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";

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

const CardAsset = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary="Bitcoin" secondary="0.3 BTC" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary="USDT" secondary="1500 USDT" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary="Gold" secondary="10 g" />
        </ListItem>
      </List>
    </Card>
  );
};

export default CardAsset;
