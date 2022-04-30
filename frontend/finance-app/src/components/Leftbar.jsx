import { Container, makeStyles, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Leftbar = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Home className={classes.icon} />
        <Link className={classes.text} href="#" to="/" component={NavLink}>
          Dashboard
        </Link>
      </div>
      <div className={classes.item}>
        <AccountBalanceWalletIcon className={classes.icon} />
        <Link
          className={classes.text}
          href="#"
          to="/wallet"
          component={NavLink}
        >
          Wallet
        </Link>
      </div>
      <div className={classes.item}>
        <MonetizationOnIcon className={classes.icon} />
        <Link className={classes.text} href="#" to="/assetnew" component={NavLink}>
          Asset
        </Link>
      </div>
      <div className={classes.item}>
        <EqualizerIcon className={classes.icon} />
        <Typography className={classes.text}>Statistic</Typography>
      </div>
      <div className={classes.item}>
        <AccountBoxIcon className={classes.icon} />
        <Link className={classes.text} href="#" to="/login" component={NavLink}>
          User Profile
        </Link>
      </div>
    </Container>
  );
};

export default Leftbar;
