import React, { useState, useContext, useEffect } from "react";
import defaultUserImage from "../assets/defaultUserImage.png";
import DialogControl from "../components/Dialogs/DialogControl";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { RecipeContext, RecipeDispatchContext } from "../context/RecipeContext";
import { UserContext } from "../context/UserContext";
import TestRecipe from "../components/TestRecipe";
import axios from "axios";
import { Button } from "@material-ui/core";
import { getRecipesByChef } from "../actions/recipeActions";
import NavBar from "../components/NavBar";

const ChefProfile = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [control, setControl] = useState(null);

  const { recipes } = useContext(RecipeContext);
  const dispatch = useContext(RecipeDispatchContext);

  const { userInfo } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfileAndRecipes = async () => {
      const res = await axios.get(`/api/chefProfiles/${userInfo._id}`);
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
  }, [dispatch, userInfo, history]);

  const handleClickOpen = (e) => {
    setOpen(true);
    setControl(e.target.name);
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

          {recipes.map((recipe) => (
            <TestRecipe recipe={recipe} key={recipe._id} id={recipe._id} />
          ))}
        </div>

        <DialogControl
          open={open}
          onClose={handleClose}
          control={control}
          profile={profile}
        />
      </div>
    </>
  );
};

export default ChefProfile;
