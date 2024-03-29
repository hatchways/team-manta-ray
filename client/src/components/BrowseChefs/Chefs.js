import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Avatar, Typography, Chip } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Chefs = ({ chefProfileUrl, name, location, cuisineTags, bio, link }) => {
  const useStyles = makeStyles((theme) => ({
    avatar: {
      width: "100px",
      height: "100px",
    },

    cuisineChip: {
      borderRadius: "0px",
    },

    chefBio: {
      display: "box",
      lineClamp: 2,
      boxOrient: "vertical",
      overflow: "hidden",
    },
  }));

  const classes = useStyles();

  const history = useHistory();

  const chefClickHandler = () => {
    history.push(link);
  };

  return (
    <Grid
      item
      md={4}
      xs={12}
      onClick={chefClickHandler}
      style={{ cursor: "pointer" }}
    >
      <Paper style={{ height: 400 }}>
        <Box pt={5} pb={5}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              alt="chef avatar"
              src={chefProfileUrl}
              className={classes.avatar}
            />
          </Box>
          <Box textAlign="center">
            <Box>
              <Typography variant="h5">{name}</Typography>
            </Box>
            <Box mt={0.5}>
              <Typography variant="body2">{location}</Typography>
            </Box>
            <Box mt={3} mb={3}>
              <Chip
                key={`${name}`}
                label={cuisineTags[0].toUpperCase() + " CUISINE"}
                color="secondary"
                className={classes.cuisineChip}
              />
            </Box>
            <Box pl={5} pr={5}>
              <Typography align="center" className={classes.chefBio}>
                {bio}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Chefs;
