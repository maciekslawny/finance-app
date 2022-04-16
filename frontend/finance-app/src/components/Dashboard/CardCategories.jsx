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

const CardCategories = () => {
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
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Food" secondary="250 PLN" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sport" secondary="120 PLN" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Fun" secondary="40 PLN" />
        </ListItem>
      </List>
    </Card>
  );
};

export default CardCategories;
