import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterChefs from "../components/BrowseChefs/FilterChefs";
import Chefs from "../components/BrowseChefs/Chefs";

const BrowseChefs = (props) => {
  const useStyles = makeStyles((theme) => ({
    title: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(6),
    },
  }));

  const classes = useStyles();

  const chefs = [
    {
      chefProfileUrl:
        "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      name: "Gordon Ramsay",
      location: "Toronto, ON",
      cuisineTags: ["Japanese"],
      bio:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    },
    {
      chefProfileUrl:
        "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      name: "Gordon Ramsay",
      location: "Toronto, ON",
      cuisineTags: ["Japanese"],
      bio:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    },
    {
      chefProfileUrl:
        "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      name: "Gordon Ramsay",
      location: "Toronto, ON",
      cuisineTags: ["Japanese"],
      bio:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    },
    {
      chefProfileUrl:
        "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      name: "Gordon Ramsay",
      location: "Toronto, ON",
      cuisineTags: ["Japanese"],
      bio:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    },
    {
      chefProfileUrl:
        "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      name: "Gordon Ramsay",
      location: "Toronto, ON",
      cuisineTags: ["Japanese"],
      bio:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    },
    {
      chefProfileUrl:
        "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      name: "Gordon Ramsay",
      location: "Toronto, ON",
      cuisineTags: ["Japanese"],
      bio:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    },
  ];

  return (
    <Grid container>
      <Grid item md={2} xs={12} sm={6}>
        <FilterChefs />
      </Grid>
      <Grid item md={10} xs={12} sm={6}>
        <Grid container justify="center">
          <Grid item xl={8} lg={9} md={10} sm={11} xs={12}>
            <Box
              className={classes.title}
              display="flex"
              justifyContent="center"
            >
              <Typography variant="h4">Available Chefs:</Typography>
            </Box>
            <Grid container spacing={2}>
              {chefs.length > 0 ? (
                chefs.map((chef, i) => (
                  <Chefs
                    key={`${chef.name}${i}`}
                    chefProfileUrl={chef.chefProfileUrl}
                    name={chef.name}
                    location={chef.location}
                    cuisineTags={chef.cuisineTags}
                    bio={chef.bio}
                  />
                ))
              ) : (
                <Box>No chefs found</Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BrowseChefs;
