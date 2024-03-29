import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import line from "../../assets/line.png";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DialogControl from "../Dialogs/DialogControl";
import { UserContext } from "../../context/UserContext";
import defaultUserPicture from "../../assets/defaultUserImage.png";
import axios from "axios";

const ChefSideBar = (props) => {
  const { chefProfile } = props.chefInfosAndRecipes;
  const { userInfo, profile, setProfile, isOwner } = props;
  const { userId } = useParams();
  const history = useHistory();

  const { coverPictureUrl } = chefProfile;

  const theme = useTheme();

  const isBrowser = useMediaQuery(theme.breakpoints.up("md"));

  const useStyles = makeStyles((theme) => ({
    chefSideBarContainer: {
      position: isBrowser ? "fixed" : "relative",
      marginTop: theme.spacing(8),
      width: "100%",
    },

    chefSideBar: {
      height: isBrowser ? "calc(100vh - 60px)" : "100vh",
      backgroundColor: "white",
    },

    avatar: {
      width: 140,
      height: 140,
      transform: "translate3d(0, -50%,0)",
      border: "5px solid white",
    },

    lineBreak: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },

    chefBio: {
      marginRight: theme.spacing(8),
      marginLeft: theme.spacing(8),
      lineHeight: "1.6",
    },
    chefBioText: {
      fontSize: "20px",
      fontWeight: 400,
    },

    chefCover: {
      backgroundImage: `url("${coverPictureUrl}")`,
      height: "25%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },

    chefMenuName: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },

    chefReqBtnContainer: {
      height: "15%",
      display: "flex",
      width: "100%",
    },

    chefReqBtn: {
      height: "100%",
      borderRadius: "0",
      width: "100%",
      textDecoration: "none",
    },

    chefInfoContainer: {
      height: "60%",
    },

    location: {
      fontSize: "20px",
      fontWeight: 600,
    },

    profileName: {
      fontWeight: 600,
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [control, setControl] = useState(null);
  const { cart } = useContext(UserContext);

  const contactChefHandler = async () => {
    try {
      await axios.post("/api/chat/contact", {
        recipient: userId,
      });
      history.push(`/chat/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = (ctl) => {
    setOpen(true);
    setControl(ctl);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  useEffect(() => {
    if (profile && !profile.location) {
      setControl("EditProfile");
      setOpen(true);
    }
  }, [profile]);

  return (
    <Grid item md={3} xs={12} className={classes.chefSideBarContainer}>
      <Box className={classes.chefSideBar}>
        {/* Cover */}
        <Box className={classes.chefCover} />

        {/* Chef Info */}
        <Box className={classes.chefInfoContainer}>
          {/* Profile Image */}
          <Box display="flex" justifyContent="center">
            <Avatar
              alt="chef cover photo"
              src={profile ? profile.profilePictureUrl : defaultUserPicture}
              className={classes.avatar}
            />
          </Box>
          <Box marginTop={-7} textAlign="center">
            <Box>
              {userInfo && (
                <Typography variant="h4" className={classes.profileName}>
                  {profile ? profile.name : userInfo.name}
                </Typography>
              )}
            </Box>
            <Box>
              {userInfo && (
                <Typography variant="body2">
                  {profile && profile.address
                    ? profile.address.city + ", " + profile.address.province
                    : userInfo.address !== undefined
                    ? userInfo.address.city + ", " + userInfo.address.province
                    : ""}
                  {/* {userInfo.address !== undefined
                    ? userInfo.address.city + ", " + userInfo.address.province
                    : ""} */}
                  {/* {location} */}
                </Typography>
              )}
            </Box>
            <Box className={classes.lineBreak}>
              <img src={line} alt="linebreak" />
            </Box>
            <Box className={classes.chefBio}>
              <Typography variant="body1" className={classes.chefBioText}>
                {profile ? profile.bio : "Add a bio to your profile"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Actions */}
        {isOwner ? (
          <Box className={classes.chefReqBtnContainer} display="flex">
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              className={classes.chefReqBtn}
              onClick={() => handleClickOpen("EditProfile")}
            >
              Edit profile
            </Button>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={() => handleClickOpen("AddRecipe")}
              className={classes.chefReqBtn}
            >
              Add recipe
            </Button>
          </Box>
        ) : (
          <Box className={classes.chefReqBtnContainer} display="flex">
            <Button
              onClick={contactChefHandler}
              variant="contained"
              color="secondary"
              className={classes.chefReqBtn}
            >
              Contact Chef
            </Button>
            {!isOwner && cart.length > 0 && (
              <Link to="/payment" className={classes.chefReqBtn}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.chefReqBtn}
                >
                  Proceed to checkout
                </Button>
              </Link>
            )}
          </Box>
        )}
      </Box>
      <DialogControl
        open={open}
        onClose={handleClose}
        control={control}
        profile={profile}
        setProfile={(e) => setProfile(e)}
      />
    </Grid>
  );
};

export default ChefSideBar;
