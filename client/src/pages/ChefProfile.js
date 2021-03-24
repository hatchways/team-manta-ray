import React, { useState, useEffect, useContext } from "react";
import { Grid, Hidden, Box, Typography, Paper } from "@material-ui/core";
import ChefSideBar from "../components/ChefProfile/ChefSideBar";
import ChefRecipes from "../components/ChefProfile/ChefRecipes";
import { makeStyles } from "@material-ui/core/styles";
import { RecipeContext, RecipeDispatchContext } from "../context/RecipeContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { getRecipesByChef } from "../actions/recipeActions";

const ChefProfile = ({ history }) => {
  const useStyles = makeStyles((theme) => ({
    chefMenuName: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(6),
    },
  }));

  const classes = useStyles();

  const { recipes } = useContext(RecipeContext);
  const dispatch = useContext(RecipeDispatchContext);

  const { userInfo } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.isChef) {
      const getProfileAndRecipes = async () => {
        const res = await axios.get(`/api/chefProfiles/${userInfo._id}`);
        if (res.data) {
          setProfile(res.data.chefProfile);
          getRecipesByChef(dispatch, res.data.chefProfile._id);
        }
      };
      getProfileAndRecipes();
    }
    // else if (!userInfo) {
    //   history.replace("/login");
    // }
  }, [dispatch, userInfo, history]);

  const chefInfosAndRecipes = {
    name: "Gordon Ramsey",
    chefProfile: {
      coverPictureUrl:
        "https://media.gq.com/photos/5a03339d1a820c56cf27b8b3/16:9/pass/you're-gonna-love-pittsburgh-0917-gq-matr01-02.jpg",
      location: "Toronto, ON",
      bio:
        "Gordon Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      profilePictureUrl:
        "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      cuisineTags: ["european", "american", "asian"],
    },
  };

  return (
    <Grid container>
      {/* Chef infos */}
      <ChefSideBar
        chefInfosAndRecipes={chefInfosAndRecipes}
        profile={profile}
        userInfo={userInfo}
        setProfile={setProfile}
      />

      {/* Imaginary Grid for mdUp views*/}
      <Hidden smDown>
        <Grid item md={3} xs={12} />
      </Hidden>

      {/* Recipes */}
      <Grid item md={9} xs={12}>
        <Grid container justify="center">
          <Grid item xl={8} lg={9} md={10} sm={11} xs={12}>
            <Box textAlign="center" className={classes.chefMenuName}>
              {userInfo && (
                <Typography variant="h4">{`${
                  userInfo.name.split(" ")[0]
                }'s Menu`}</Typography>
              )}
            </Box>
            <Paper elevation={3}>
              {recipes.map((recipe) => (
                <ChefRecipes recipe={recipe} key={recipe._id} id={recipe._id} />
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChefProfile;
