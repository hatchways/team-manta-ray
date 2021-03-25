import React, { useContext, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Divider,
  Button,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import plate from "../../assets/plate.svg";

import DialogControl from "../Dialogs/DialogControl";
import {
  addToCart,
  getChosenChefProfile,
  setChefConflictError,
} from "../../actions/cartActions";
import { UserContext, UserDispatchContext } from "../../context/UserContext";

const ChefProfile = ({ recipe, isOwner }) => {
  // const { recipes } = useContext(RecipeContext);
  // const recipe = recipes.filter((res) => res._id === id)[0];
  const {
    name,
    price,
    ingredients,
    requiredStuff,
    portionDescription,
    recipePictureUrl,
  } = recipe;

  const dispatch = useContext(UserDispatchContext);
  const { chosenChefProfile, cart, chefConflictErr } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleClose = (value) => {
    setOpen(false);
  };
  const handleAddToCart = () => {
    if (cart.length === 0) {
      getChosenChefProfile(dispatch, recipe.user);
      addToCart(dispatch, recipe);
    } else {
      const isSelectingFromADifferentChef =
        chosenChefProfile && chosenChefProfile._id !== recipe.user;

      if (isSelectingFromADifferentChef) {
        setChefConflictError(dispatch);
      } else {
        addToCart(dispatch, recipe);
      }
    }
  };

  const useStyles = makeStyles((theme) => ({
    portionDesc: {
      borderRadius: "0",
    },

    chefRecipeImage: {
      backgroundImage: `url("${recipePictureUrl ? recipePictureUrl : plate}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      height: "300px",
      cursor: "pointer",
      "& button": {
        visibility: "hidden",
      },
    },
    chefRecipeImageWithBtn: {
      backgroundImage: `url("${recipePictureUrl ? recipePictureUrl : plate}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      height: "300px",
      cursor: "pointer",
      display: "flex",
      "& button": {
        margin: "auto",
        height: theme.spacing(5),
        width: theme.spacing(14),
        textTransform: "capitalize",
        borderRadius: "0",
        visibility: "hidden",
      },
      "&:hover": {
        opacity: "0.95",
        transform: "scale(1.01)",
        transition: "all 0.5s ease-out",
        "& button": {
          visibility: "visible",
          zIndex: 1,
          opacity: "1",
        },
      },
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
            className={
              isOwner ? classes.chefRecipeImage : classes.chefRecipeImageWithBtn
            }
            onClick={() => (isOwner ? setOpen(true) : null)}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </Box>
        </Grid>
      </Grid>
      <DialogControl
        open={open}
        onClose={handleClose}
        control="EditRecipe"
        recipe={{ ...recipe }}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={chefConflictErr ? true : false}
        message={chefConflictErr}
      />
      <Divider />
    </>
  );
};

export default ChefProfile;
