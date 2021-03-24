import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  OutlinedInput,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LocationOnIcon from "@material-ui/icons/LocationOn";

const FilterChefs = (props) => {
  const useStyles = makeStyles((theme) => ({
    searchField: {
      marginTop: theme.spacing(9),
      marginBottom: theme.spacing(6),
    },

    cuisineChip: {
      borderRadius: "0px",
    },
  }));

  const classes = useStyles();

  const cuisineTags = [
    "ALL",
    "AMERICAN",
    "BRITISH",
    "CARIBBEAN",
    "CHINESE",
    "FRENCH",
    "GREEK",
    "INDIAN",
    "ITALIAN",
    "JAPANESE",
    "MEDITERRANEAN",
    "MEXICAN",
    "MORROCAN",
    "SPANISH",
    "THAI",
    "TURKISH",
    "VIETNAMESE",
  ];

  const [activeCuisineTags, setActiveCuisineTags] = useState([cuisineTags[0]]);

  const addActiveCuisineTag = (cuisineTag) => {
    if (activeCuisineTags.includes(cuisineTag)) return;

    setActiveCuisineTags((prevCuisineTags) => {
      if (cuisineTag === "ALL") return ["ALL"];

      if (prevCuisineTags[0] === "ALL") return [cuisineTag];

      return [...prevCuisineTags, cuisineTag];
    });
  };

  const deleteActiveCuisineTags = (cuisineTag) => {
    setActiveCuisineTags((prevCuisineTags) => {
      if (prevCuisineTags.length === 1) return ["ALL"];

      return prevCuisineTags.filter(
        (prevCuisineTag) => prevCuisineTag !== cuisineTag
      );
    });
  };

  return (
    <Box height="100vh" bgcolor="white">
      <Box display="flex" justifyContent="center">
        <Box width="100%" pl={4} pr={4} className={classes.searchField}>
          <Box mb={4}>
            <Box mb={1}>
              <Typography variant="body1">LOCATION:</Typography>
            </Box>
            <FormControl variant="outlined" fullWidth color="secondary">
              <OutlinedInput
                endAdornment={<LocationOnIcon color="secondary" />}
              />
            </FormControl>
          </Box>
          <Box mb={4}>
            <Box mb={1}>
              <Typography variant="body1">CUISINE:</Typography>
            </Box>
            {activeCuisineTags.map((activeCuisineTag, i) => {
              return (
                <Chip
                  className={classes.cuisineChip}
                  color="secondary"
                  label={activeCuisineTag}
                  onDelete={
                    activeCuisineTag === "ALL"
                      ? null
                      : () => deleteActiveCuisineTags(activeCuisineTag)
                  }
                  component={Box}
                  mb={1}
                  mr={1}
                />
              );
            })}
          </Box>
          <Box>
            {cuisineTags.map((cuisineTag, i) => (
              <Chip
                className={classes.cuisineChip}
                label={cuisineTag}
                onClick={() => addActiveCuisineTag(cuisineTag)}
                variant="outlined"
                component={Box}
                mb={1}
                mr={1}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterChefs;
