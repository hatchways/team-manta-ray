import React from "react";
// import { AuthContext } from "../context/auth-context";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";

import Map from "../components/Map";

import profilePic from "../assets/dummyavatar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: "0%",
    left: "50%",
    transform: "translate(-50%)",
    height: "85vh",
    width: "60vw",
  },
  paper: {
    height: "97%",
    width: "100%",
    fontFamily: "Montserrat, sans-serif",
  },
  gridParent: {
    height: "55%",
  },
  nameCard: {
    paddingTop: "20px",
  },
  profileImage: {
    height: "80px",
    width: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid white",
    boxShadow: "0px 0px 10px 7px rgba(0,0,0,0.07)",
    marginBottom: "10px",
  },
  nameText: {
    textAlign: "center",
    margin: "5px",
    fontSize: "18px",
  },
  button: {
    borderRadius: "0",
    textTransform: "none",
    fontWeight: "bold",
    fontSize: "10px",
    height: "40px",
    width: "120px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  cuisine: {
    backgroundColor: "#FF743D",
    color: "white",
    fontSize: "8px",
    padding: "5px 10px",
    textTransform: "uppercase",
  },
}));

const CustomerProfile = () => {
  // const { userData } = useContext(AuthContext);
  //Dummy profile data for now
  const userData = {
    name: "Christine Wilson",
    city: "Toronto, Canada",
    about:
      "Hi everyone! I'm a foodie and I love to eat healthy and tasty meals. Also I'm a mom of two beautiful babies.",
    favCuisines: ["Japanese", "Chinese", "Mediterranean", "Thai"],
    location: {
      lat: 43.6398,
      lng: -79.39793,
    },
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={5} square>
        <Grid container className={classes.gridParent}>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            xs={5}
            className={classes.nameCard}
          >
            <Grid
              item
              container
              justify="center"
              className={classes.profilePic}
              xs={12}
            >
              <Grid item>
                <img
                  src={profilePic}
                  className={classes.profileImage}
                  alt="profile pic"
                />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Grid item>
                  <h2 className={classes.nameText}>{userData.name}</h2>
                  <h3
                    style={{ fontSize: "11px", opacity: 0.4 }}
                    className={classes.nameText}
                  >
                    {userData.city}
                  </h3>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  className={classes.button}
                >
                  Send message
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" xs={7}>
            <Grid item xs={12}>
              <h2 style={{ fontSize: "13px", paddingTop: "20px" }}>
                ABOUT ME:
              </h2>
              <p style={{ fontSize: "11px", opacity: 0.6 }}>{userData.about}</p>
            </Grid>
            <Grid item container xs={12}>
              <h2 style={{ fontSize: "13px" }}>FAVORITE CUISINES:</h2>
              <Grid
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={1}
                xs={12}
              >
                {userData.favCuisines.map((cuisine) => {
                  return (
                    <Grid item>
                      <h4 className={classes.cuisine}>{cuisine}</h4>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div style={{ height: "45%", width: "100%" }}>
          <Map lat={userData.location.lat} lng={userData.location.lng}></Map>
        </div>
      </Paper>
    </div>
  );
};

export default CustomerProfile;
