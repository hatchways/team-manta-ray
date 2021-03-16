import React, { useState, useContext } from "react";
import defaultUserImage from "../assets/defaultUserImage.png";
import DialogControl from "../components/Dialogs/DialogControl";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { RecipeContext } from "../context/recipe-context";
import Recipe from "../components/Recipe";

const ChefProfile = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const { recipes } = useContext(RecipeContext);

  const handleClickOpen = (e) => {
    setOpen(true);
    console.log(e.target);
    setId(e.target.id);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
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
        value="Toronto, canada"
        readOnly
      />
      <input
        style={{ cursor: "pointer" }}
        onClick={handleClickOpen}
        name="name"
        id="name"
        value="Atsushi Mikazuki"
        readOnly
      />

      <div style={{ float: "right" }}>
        <h1>Recipes</h1>
        <input
          type="checkbox"
          name="panel-toggle"
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
          <Recipe recipe={recipe} key={recipe.id} id={recipe.id} />
        ))}
      </div>

      <DialogControl open={open} onClose={handleClose} id={id} />
    </div>
  );
};

export default ChefProfile;
