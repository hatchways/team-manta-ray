import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, Typography, Chip, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RecipeContext } from "../../context/RecipeContext";
import { RecipeDispatchContext } from "../../context/RecipeContext";
import { setSrcDataToRecipe } from "../../actions/recipeActions";
import plate from "../../assets/plate.svg";
import useGetSrcData from "../../hooks/useGetSrcData";
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
    pictureKey,
    srcData,
  } = recipe;

  const dispatch = useContext(RecipeDispatchContext);

  const [src, setSrc] = useState(srcData ? srcData : null);
  const [open, setOpen] = useState(false);

  const getSrcData = useGetSrcData();
  useEffect(() => {
    const getImageSrcData = async () => {
      if (srcData || !pictureKey) return;
      const response = await getSrcData(pictureKey);
      if (response.srcData) {
        // setSrc(response.srcData);
        setSrcDataToRecipe(dispatch, recipe._id, response.srcData);
      }
    };
    if (srcData) {
      setSrc(srcData);
    }

    getImageSrcData();
  }, [pictureKey, getSrcData, srcData, dispatch, recipe._id]);

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
      backgroundImage: `url("${srcData ? srcData : plate}")`,
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
        recipe={{ ...recipe, srcData }}
      />
      <Divider />
    </>
  );
};

export default ChefProfile;
