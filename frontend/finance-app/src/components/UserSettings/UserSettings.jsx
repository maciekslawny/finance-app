import React, { useEffect, useState } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import axiosInstance from "../../axios";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

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

export default function UserSettings(props) {
  const [yourProfile, setYourProfile] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const classes = useStyles();
  const [updatedTimes, setUpdatedTimes] = useState(0);

  useEffect(() => {
    axiosInstance.get(`accounts/your-profile/1/`).then((res) => {
      setYourProfile(res.data)
      console.log(res.data)
    });
    axiosInstance.get(`api-data/currency`).then((res) => {
      setCurrencies(res.data)
      console.log(res.data)
    });
  }, [updatedTimes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setYourProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit() {
    console.log(yourProfile);
    axiosInstance
      .put(`accounts/your-profile/1/`, JSON.stringify(yourProfile))
      .then();
  }

  return (
  <div>
      <Container className={classes.container}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">User Settings</Typography>
      </Breadcrumbs>
        {yourProfile &&
      <Card className={classes.optionsCard}>
        <CardContent>

                <TextField
                    margin="dense"
                    id="goal_amount"
                    fullWidth
                    value={yourProfile.goal_amount}
                    name="goal_amount"
                    label="Goal amount"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                <TextField
                  margin="dense"
                  fullWidth
                  value={yourProfile.goal_currency}
                  name="goal_currency"
                  id="outlined-select-currency"
                  select
                  label="Select goal currency"
                  onChange={handleInputChange}
                >

                 {currencies.map((option) => (
                    <MenuItem key={option.id} value={option.id} >
                      {option.name}
                    </MenuItem>
                  ))}

                </TextField>

                <TextField
                  margin="dense"
                  fullWidth
                  value={yourProfile.selected_currency}
                  name="selected_currency"
                  id="outlined-select-currency"
                  select
                  label="Select User currency"
                  onChange={handleInputChange}
                >

                 {currencies.map((option) => (
                    <MenuItem key={option.id} value={option.id} >
                      {option.name}
                    </MenuItem>
                  ))}

                </TextField>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>


        </CardContent>

      </Card>
            }

      </Container>
  </div>
  );
}