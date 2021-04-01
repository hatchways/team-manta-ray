import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import Map from "../components/Map";
import { UserContext } from "../context/UserContext";
import defaultImage from "../assets/defaultUserImage.png";
import DialogControl from "../components/Dialogs/DialogControl";
import Loader from "../components/Loader";

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
    // maxHeight: theme.spacing(40),
  },
  profileImage: {
    height: "90px",
    width: "90px",
    borderRadius: "50%",
    marginTop: theme.spacing(6),
    objectFit: "cover",
    border: "5px solid white",
    boxShadow: "0px 0px 10px 7px rgba(0,0,0,0.07)",
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

const CustomerProfile = ({ history }) => {
  //Dummy profile data for now
  const { userInfo, loading } = useContext(UserContext);

  const user = {
    name: "Christine Wilson",
    city: "Toronto, Canada",
    about:
      "Hi everyone! I'm a foodie and I love to eat healthy and tasty meals. Also I'm a mom of two beautiful babies.",
    cuisines: ["Japanese", "Chinese", "Mediterranean", "Thai"],
    location: {
      lat: 43.6398,
      lng: -79.39793,
    },
  };
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      history.replace("/login");
    }
    const getUserInfo = async () => {
      try {
        const res = await axios.get("/api/users");
        console.log(res);
        if (res.data) {
          setUserData(res.data.user);
        } else {
          console.log("No data");
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (!userData) getUserInfo();

    if (userData && !userData.location) setOpen(true);
  }, [userData, userInfo, history]);

  return userInfo && !userData ? (
    <Loader />
  ) : (
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
                  src={
                    userData && userData.profilePictureUrl
                      ? userData.profilePictureUrl
                      : defaultImage
                  }
                  className={classes.profileImage}
                  alt="profile pic"
                />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Grid item>
                  <h2 className={classes.nameText}>
                    {userInfo ? userInfo.name : userData.name}
                  </h2>
                  <h3
                    style={{ fontSize: "12px", opacity: 0.4 }}
                    className={classes.nameText}
                  >
                    {userInfo.address !== undefined
                      ? userInfo.address.city + ", " + userInfo.address.province
                      : ""}
                  </h3>
                </Grid>
                {loading && <Loader />}
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  className={classes.button}
                  onClick={() => setOpen(true)}
                >
                  Edit profile
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" xs={7}>
            <Grid item xs={12}>
              <h2 style={{ fontSize: "13px", paddingTop: "20px" }}>
                ABOUT ME:
              </h2>
              <p style={{ fontSize: "15px", opacity: 0.6, marginRight: "8px" }}>
                {userData.bio ? userData.bio : "Write about yourself"}
              </p>
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
                {userData.cuisines.map((cuisine, idx) => {
                  return (
                    <Grid item key={idx}>
                      <h4 className={classes.cuisine}>{cuisine}</h4>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div style={{ height: "45%", width: "100%" }}>
          <Map
            lat={
              userData.location && userData.location.coordinates
                ? userData.location.coordinates[1]
                : user.location.lat
            }
            lng={
              userData.location && userData.location.coordinates
                ? userData.location.coordinates[0]
                : user.location.lng
            }
          ></Map>
        </div>
      </Paper>
      <DialogControl
        open={open}
        onClose={() => setOpen(false)}
        control="EditProfile"
        isChef={false}
        profile={userData}
        setProfile={(e) => setUserData(e)}
      />
    </div>
  );
};

export default CustomerProfile;
