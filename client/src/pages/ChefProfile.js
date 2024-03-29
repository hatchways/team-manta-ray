import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Typography, Paper } from "@material-ui/core";
import ChefSideBar from "../components/ChefProfile/ChefSideBar";
import ChefRecipes from "../components/ChefProfile/ChefRecipes";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import axios from "axios";
import { getRecipesByChef } from "../actions/recipeActions";

const ChefProfile = ({ history, match }) => {
  const { userId, recipeId } = match.params;

  const useStyles = makeStyles((theme) => ({
    chefMenuName: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(6),
    },
  }));

  const classes = useStyles();

  const { recipes, userInfo } = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

  const [profile, setProfile] = useState(null);
  const [isOwner, setIsOwner] = useState(true);

  const [selectedRecipe, setSelectedRecipe] = useState(
    recipeId ? recipeId : null
  );
  const refs = recipes.reduce((acc, recipe) => {
    acc[recipe._id] = React.createRef();
    return acc;
  }, {});

  useEffect(() => {
    if (userInfo) {
      const getProfileAndRecipes = async () => {
        const path = userId ? `/api/users/${userId}` : `/api/users`;
        const res = await axios.get(path);
        if (res.data) {
          setProfile(res.data.user);
          const id = userId || userInfo._id;
          getRecipesByChef(dispatch, id);
        }
      };
      getProfileAndRecipes();
    }
    setIsOwner(userId && userId !== userInfo._id ? false : true);
  }, [dispatch, userInfo, userId]);

  useEffect(() => {
    if (selectedRecipe && refs[selectedRecipe]) {
      refs[selectedRecipe].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setSelectedRecipe(null);
    }
  }, [refs, userId, selectedRecipe]);

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
      <Grid item md={3} xs={12}>
        <ChefSideBar
          chefInfosAndRecipes={chefInfosAndRecipes}
          profile={profile}
          userInfo={userInfo}
          setProfile={setProfile}
          isOwner={isOwner}
        />
      </Grid>

      {/* Recipes */}
      <Grid item md={9} xs={12}>
        <Grid container justify="center">
          <Grid item xl={8} lg={9} md={10} sm={11} xs={12}>
            <Box textAlign="center" className={classes.chefMenuName}>
              {profile && (
                <Typography variant="h4">{`${
                  profile.name.split(" ")[0]
                }'s Menu`}</Typography>
              )}
            </Box>
            <Paper elevation={3}>
              {recipes &&
                recipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    // ref={recipeId && recipeId === recipe._id ? myRef : null}
                    ref={refs[recipe._id]}
                  >
                    <ChefRecipes
                      recipe={recipe}
                      key={recipe._id}
                      id={recipe._id}
                      isOwner={isOwner}
                      // ref={recipeId && recipeId === recipe._id ? myRef : null}
                    />
                  </div>
                ))}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChefProfile;
