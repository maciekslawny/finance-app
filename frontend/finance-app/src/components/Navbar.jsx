import {
  AppBar,
  Avatar,
  Badge,
  InputBase,
  Typography,
  Toolbar,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { Cancel, Mail, Notifications, Search } from "@material-ui/icons";
import {useEffect, useState} from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import axiosInstance from "../axios";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {NavLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import IconButton from '@mui/material/IconButton';
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.openSearch ? "flex" : "none"),
    },
  },
  searchIcon: {
    marginLeft: theme.spacing(0.5),
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    display: (props) => (props.openSearch ? "none" : "flex"),
  },
  logoutIcon: {
    marginRight: theme.spacing(1),
  },
  iconButton: {
    marginLeft: 0,
    marginRight: 0,
    color: "white"
  },
  badge: {
    marginRight: theme.spacing(0),
  },
}));

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const classes = useStyles({ openSearch });
  let [isAuthorized, setIsAuthorized] = useState({authorized: false});
  let [updatedTimes, setUpdatedTimes] = useState(0);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    axiosInstance.get(`accounts/is-authorized/`).then((res) => {
      setIsAuthorized(res.data)
    });
  }, [location.pathname]);


  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logoLg}>
          FINANCE App
        </Typography>
        <Typography variant="h6" className={classes.logoSm}>
          Finance App
        </Typography>
        <div className={classes.search}>
          <Search className={classes.searchIcon} />
          <InputBase placeholder="Search.." className={classes.input} />
          <Cancel
            className={classes.cancel}
            onClick={() => setOpenSearch(false)}
          />
        </div>
        <div className={classes.icons}>
          <Search
            className={classes.searchButton}
            onClick={() => setOpenSearch(true)}
          />


          {isAuthorized.authorized ?
          <div>

              <IconButton  href="/logout"  rel="noopener noreferrer">
                <Badge badgeContent={2} color="secondary" className={classes.badge}>
                <Mail className={classes.iconButton} />
                </Badge>
                </IconButton>

            <IconButton href="/register"  rel="noopener noreferrer">
               <Badge badgeContent={0} color="secondary" className={classes.badge}>

                <Notifications className={classes.iconButton} href="#" to="/user-settings" />
               </Badge>
               </IconButton>

            <IconButton href="/logout"  rel="noopener noreferrer">

              <LogoutIcon className={classes.iconButton} onClick={() => setUpdatedTimes(updatedTimes+1)} />
            </IconButton>
          </div>
              :
          <div>
            <IconButton href="/register"  rel="noopener noreferrer">
              <AppRegistrationIcon className={classes.iconButton} />
            </IconButton>
            <IconButton href="/login"  rel="noopener noreferrer">
              <LoginIcon className={classes.iconButton} onClick={() => setUpdatedTimes(updatedTimes+1)} />
            </IconButton>
          </div>
          }
          <Avatar alt="Maciej Slawny" src="" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
