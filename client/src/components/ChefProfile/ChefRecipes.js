import React from "react";
import { Box, Grid, Typography, Chip, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ChefProfile = (props) => {
  const {
    name,
    pictureUrl,
    price,
    ingredients,
    requiredStuffs,
    portionDescription,
    cuisineTags,
  } = props.recipe;

  const useStyles = makeStyles((theme) => ({
    portionDesc: {
      borderRadius: "0",
    },

    chefRecipeImage: {
      backgroundImage: `url("${pictureUrl}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      height: "300px",
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
              <Typography color="secondary">{price}</Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1">INGREDIENTS:</Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography variant="body2">
                {ingredients.map((ingredient) => `${ingredient}, `)}
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography variant="body1">REQUIRED STUFF:</Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography variant="body2">
                {requiredStuffs.map((requiredStuff) => `${requiredStuff}, `)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box m={5} className={classes.chefRecipeImage} />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default ChefProfile;
