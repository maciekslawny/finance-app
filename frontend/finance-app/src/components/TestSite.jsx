import { Grid, makeStyles } from "@material-ui/core";
import Feed from "./Feed";
import Leftbar from "./Leftbar";
import Navbar from "./Navbar";
import Rightbar from "./Rightbar";

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const TestSite = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Feed />
        </Grid>
      </Grid>
    </div>
  );
};

export default TestSite;
