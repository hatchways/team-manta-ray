import React, { useContext, useState } from "react";
import { Box, Grid, Typography, Chip, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RecipeContext } from "../../context/RecipeContext";
import { RecipeDispatchContext } from "../../context/RecipeContext";

import plate from "../../assets/plate.svg";

import DialogControl from "../Dialogs/DialogControl";

const ChefProfile = ({ id }) => {
  const { recipes } = useContext(RecipeContext);
  const recipe = recipes.filter((res) => res._id === id)[0];
  const {
    name,
    price,
    ingredients,
    requiredStuff,
    portionDescription,
    cuisineTags,
  } = recipe;

  const dispatch = useContext(RecipeDispatchContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  // const {
  //   name,
  //   pictureUrl,
  //   price,
  //   ingredients,
  //   requiredStuffs,
  //   portionDescription,
  //   cuisineTags,
  // } = props.recipe;

  const useStyles = makeStyles((theme) => ({
    portionDesc: {
      borderRadius: "0",
    },

    chefRecipeImage: {
      backgroundImage: `url("${plate}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      height: "300px",
      cursor: "pointer",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Grid container>
        {/* RECIPE LOOPS */}
        <Grid item sm={6} xs={12}>
          <Box m={5}>
            <Box marginBottom={2}>
              <Chip
                label={portionDescription}
                className={classes.portionDesc}
                color="secondary"
              />
            </Box>
            <Box marginBottom={1}>
              <Typography variant="h4">{name}</Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography color="secondary">${price}</Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1">INGREDIENTS:</Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography variant="body2">
                {ingredients &&
                  ingredients.map((ingredient) => `${ingredient}, `)}
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1">REQUIRED STUFF:</Typography>
            </Box>
            {requiredStuff && (
              <Box marginBottom={2}>
                <Typography variant="body2">
                  {requiredStuff.map((requiredStuff) => `${requiredStuff}, `)}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box
            m={5}
            className={classes.chefRecipeImage}
            onClick={handleClickOpen}
          />
        </Grid>
      </Grid>
      <DialogControl
        open={open}
        onClose={handleClose}
        control="EditRecipe"
        recipe={{ ...recipe }}
      />
      <Divider />
    </>
  );
};

export default ChefProfile;
