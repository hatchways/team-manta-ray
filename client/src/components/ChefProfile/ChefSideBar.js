import React from "react";
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

const ChefSideBar = (props) => {
  const { name, chefProfile } = props.chefInfosAndRecipes;

  const {
    bio,
    coverPictureUrl,
    profilePictureUrl,
    location,
    cuisineTags,
  } = chefProfile;

  const theme = useTheme();

  const isOwner = true;

  const isBrowser = useMediaQuery(theme.breakpoints.up("md"));

  const useStyles = makeStyles((theme) => ({
    chefSideBarContainer: {
      position: isBrowser ? "fixed" : "relative",
    },

    chefSideBar: {
      height: isBrowser ? "calc(100vh - 75px)" : "100vh",
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
    },

    chefReqBtn: {
      height: "100%",
      borderRadius: "0",
    },

    chefInfoContainer: {
      height: "60%",
    },
  }));

  const classes = useStyles();

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
              src={profilePictureUrl}
              className={classes.avatar}
            />
          </Box>
          <Box marginTop={-7} textAlign="center">
            <Box>
              <Typography variant="h4">{name}</Typography>
            </Box>
            <Box>
              <Typography variant="body2">{location}</Typography>
            </Box>
            <Box className={classes.lineBreak}>
              <img src={line} alt="linebreak" />
            </Box>
            <Box className={classes.chefBio}>
              <Typography variant="body1">{bio}</Typography>
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
            >
              Edit profile
            </Button>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              className={classes.chefReqBtn}
            >
              Add recipe
            </Button>
          </Box>
        ) : (
          <Box className={classes.chefReqBtnContainer}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              className={classes.chefReqBtn}
            >
              Send Request
            </Button>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default ChefSideBar;
