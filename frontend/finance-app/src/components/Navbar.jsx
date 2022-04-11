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
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";

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
  badge: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const classes = useStyles({ openSearch });
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
          <Badge badgeContent={2} color="secondary" className={classes.badge}>
            <Mail />
          </Badge>
          <Badge badgeContent={0} color="secondary" className={classes.badge}>
            <Notifications />
          </Badge>
          <LogoutIcon className={classes.logoutIcon} />
          <Avatar alt="Maciej Slawny" src="" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
