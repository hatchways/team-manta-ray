import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultUserImage from "../assets/defaultUserImage.png";
import DialogControl from "../components/Dialogs/DialogControl";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import TestRecipe from "../components/TestRecipe";
import axios from "axios";
import { Button, Snackbar } from "@material-ui/core";
import { getRecipesByChef } from "../actions/recipeActions";
import NavBar from "../components/NavBar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: "0",
    marginLeft: theme.spacing(3),
    textDecoration: "none",
    "& button": {
      borderRadius: "0",
      textTransform: "capitalize",
    },
  },
}));

const ChefProfile = ({ history, match }) => {
  const classes = useStyles();

  const { recipeId, userId } = match.params;

  const [open, setOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [control, setControl] = useState(null);

  const dispatch = useContext(UserDispatchContext);

  const { userInfo, cart, chefConflictErr, recipes } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfileAndRecipes = async () => {
      const idToFetchProfile = userId ? userId : userInfo._id;
      const res = await axios.get(`/api/chefProfiles/${idToFetchProfile}`);
      if (res.data) {
        setProfile(res.data.chefProfile);
        getRecipesByChef(dispatch, res.data.chefProfile._id);
      }
    };

    if (!userInfo) {
      history.replace("/login");
    } else {
      getProfileAndRecipes();
    }

    setIsOwner(userId && userId !== userInfo._id ? false : true);
  }, [dispatch, userInfo, history, userId, recipeId]);

  const handleClickOpen = (e) => {
    if (e === "cart") {
      setControl(e);
    } else {
      setControl(e.target.name);
    }
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  const handleNewChef = async () => {
    //make user a chef
    await axios.put("/api/users/markChef");
    setControl("CreateProfile");
    setOpen(true);
  };
  return !profile ? (
    <>
      <NavBar />
      <div>
        <h1>Please set up a profile</h1>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleNewChef}
          style={{
            borderRadius: "0",
            width: "200px",
            height: "40px",
            marginTop: "30px",
            textTransform: "capitalize",
          }}
        >
          Set up a chef Profile
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{
            borderRadius: "0",
            width: "200px",
            height: "40px",
            marginTop: "30px",
            marginLeft: "5px",
            textTransform: "capitalize",
          }}
        >
          Set up a Profile
        </Button>
        <DialogControl open={open} onClose={handleClose} control={control} />
      </div>
    </>
  ) : (
    <>
      <NavBar />
      <div>
        <img
          src={defaultUserImage}
          onClick={handleClickOpen}
          name="image"
          id="image"
          alt="profile"
          style={{ height: "100px", width: "100px", cursor: "pointer" }}
        />
        <input
          style={{ cursor: "pointer" }}
          onClick={handleClickOpen}
          name="location"
          id="location"
          value={profile.bio}
          readOnly
        />
        <input
          style={{ cursor: "pointer" }}
          onClick={handleClickOpen}
          name="name"
          id="name"
          value={profile.user.name}
          readOnly
        />
        {!isOwner && (
          <Link to="/messages" className={classes.btn}>
            <Button variant="contained" color="secondary">
              Contact Chef
            </Button>
          </Link>
        )}
        {!isOwner && cart.length > 0 && (
          <Link to="/payment" className={classes.btn}>
            <Button variant="contained" color="secondary">
              Proceed to checkout
            </Button>
          </Link>
        )}

        <div style={{ float: "right" }}>
          <h1>Recipes</h1>
          <input
            type="checkbox"
            name="AddRecipe"
            id="AddRecipe"
            onClick={handleClickOpen}
            style={{ visibility: "hidden" }}
          />
          <label htmlFor="AddRecipe">
            <PlaylistAddIcon
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
            />
          </label>

          {recipes &&
            recipes.map((recipe) => (
              <div
                id={recipe._id}
                onClick={() => console.log(recipe._id + "/n" + recipe.user)}
              >
                <TestRecipe
                  recipe={recipe}
                  key={recipe._id}
                  id={recipe._id}
                  isOwner={isOwner}
                  onClick={() => console.log(recipe._id)}
                />
              </div>
            ))}
        </div>

        <DialogControl
          open={open}
          onClose={handleClose}
          control={control}
          profile={profile}
        />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={chefConflictErr ? true : false}
          autoHideDuration={6000}
          message={chefConflictErr}
        />
      </div>
    </>
  );
};

export default ChefProfile;
