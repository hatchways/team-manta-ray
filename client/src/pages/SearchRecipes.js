import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SearchRecipesCard from "../components/SearchRecipesCard.js";
import {
  Grid,
  makeStyles,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 65,
    overflow: "hidden",
  },
  sideBar: {
    height: 500,
    width: 270,
    position: "fixed",
    marginTop: 10,
    marginLeft: 30,
  },
  results: {
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
  filterHeader: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 15,
  },
  cuisineTag: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    fontSize: "10px",
    padding: "3px 6px",
    textTransform: "uppercase",
    textAlign: "center",
    margin: 3,
    userSelect: "none",
    cursor: "pointer",
  },
  selectedTag: {
    border: "none",
    color: "white",
    backgroundColor: "#FF743D",
  },
  availableTag: {
    border: "0.1rem solid rgba(0,0,0,0.1)",
    color: "black",
    backgroundColor: "white",
  },
  filterButton: {
    backgroundColor: "#FF743D",
    color: "white",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#FF510C",
    },
  },
}));

const SearchRecipes = () => {
  const classes = useStyles();
  const url = "http://localhost:3001/api/search";

  const [availableTags, setAvailableTags] = useState([
    "american",
    "british",
    "caribbean",
    "chinese",
    "french",
    "greek",
    "indian",
    "italian",
    "japanese",
    "mediterranean",
    "mexican",
    "morroccan",
    "spanish",
    "thai",
    "turkish",
    "vietnamese",
  ]);

  const [params, setParams] = useState({
    cuisines: [],
    sort: "",
  });

  const [resultsHeader, setResultsHeader] = useState("Home-cooked meals:");

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getInitialRecipes = async () => {
      try {
        const res = await axios.get(url);
        const data = res.data.data;
        await setRecipes(data);
        console.log(data);
        if (data.length === 0) {
          setResultsHeader("No recipes found. Try adjusting the filters.");
        } else {
          setResultsHeader(`${data.length} recipes found:`);
        }
      } catch (error) {
        console.log(error);
        setResultsHeader("An error has occurred");
      }
    };
    getInitialRecipes();
  }, []);

  const availableTagClickHandler = (tag) => {
    const availableTagsCopy = [...availableTags];
    availableTagsCopy.splice(availableTags.indexOf(tag), 1);
    setAvailableTags(availableTagsCopy);
    const selectedTagsCopy = [...params.cuisines];
    selectedTagsCopy.push(tag);
    setParams({ ...params, cuisines: selectedTagsCopy });
  };

  const selectedTagClickHandler = (tag) => {
    const selectedTagsCopy = [...params.cuisines];
    selectedTagsCopy.splice(params.cuisines.indexOf(tag), 1);
    setParams({ ...params, cuisines: selectedTagsCopy });
    const availableTagsCopy = [...availableTags];
    availableTagsCopy.push(tag);
    setAvailableTags(availableTagsCopy);
  };

  const selectChangeHandler = (e) => {
    setParams({ ...params, sort: e.target.value });
  };

  const filterButtonHandler = async () => {
    try {
      let sortByParam = params.sort.split(",")[0];
      let orderParam = params.sort.split(",")[1];
      const res = await axios.get(url, {
        params: {
          cuisines: params.cuisines.join(),
          sortby: sortByParam,
          order: orderParam,
        },
      });
      const data = res.data.data;
      setRecipes(data);
      console.log(data);
      if (data.length === 0) {
        setResultsHeader("No recipes found. Try adjusting the filters.");
      } else {
        setResultsHeader(`${data.length} recipes found:`);
      }
    } catch (error) {
      setResultsHeader(error.message);
    }
  };

  return (
    <>
      <NavBar />
      <Grid container className={classes.root}>
        <Grid item container xs={3} style={{ backgroundColor: "white" }}>
          <div className={classes.sideBar}>
            <Grid container style={{ marginTop: 15 }}>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="h1"
                  className={classes.filterHeader}
                >
                  CUISINE:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                {params.cuisines.length === 0 && (
                  <h5
                    style={{
                      fontWeight: 400,
                      fontSize: "10px",
                      opacity: 0.6,
                      margin: 0,
                    }}
                  >
                    No tags selected.
                  </h5>
                )}
                <Grid item container style={{ marginBottom: 15 }}>
                  {params.cuisines.sort().map((tag) => (
                    <h6
                      className={`${classes.cuisineTag} ${classes.selectedTag}`}
                      onClick={() => {
                        selectedTagClickHandler(tag);
                      }}
                      key={`selected ${tag}`}
                    >
                      {tag}
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          marginLeft: "6px",
                          opacity: 0.7,
                        }}
                      >
                        X
                      </span>
                    </h6>
                  ))}
                </Grid>
                <Grid item container style={{ marginBottom: 25 }}>
                  {availableTags.sort().map((tag) => (
                    <h6
                      className={`${classes.cuisineTag} ${classes.availableTag}`}
                      onClick={() => {
                        availableTagClickHandler(tag);
                      }}
                      key={`available ${tag}`}
                    >
                      {tag}
                    </h6>
                  ))}
                </Grid>
              </Grid>
              <Grid item container xs={9}>
                <Grid item xs={12}>
                  <Typography
                    component="h1"
                    variant="h1"
                    className={classes.filterHeader}
                  >
                    SORT BY:
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 30 }}>
                  <Select
                    value={params.sort}
                    onChange={selectChangeHandler}
                    displayEmpty
                  >
                    <MenuItem value={""}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"price,asc"}>Price: Low to high</MenuItem>
                    <MenuItem value={"price,desc"}>Price: High to low</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.filterButton}
                  onClick={filterButtonHandler}
                >
                  APPLY FILTERS
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item container spacing={5} xs={9} className={classes.results}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h2" style={{ fontSize: 20 }}>
              {resultsHeader}
            </Typography>
          </Grid>
          {recipes.map((recipe) => {
            return (
              <Grid item xs={4}>
                <SearchRecipesCard
                  chefName={recipe.user ? recipe.user.user.name : "A chef"}
                  chefProfilePic={
                    recipe.user
                      ? recipe.user.profilePictureUrl
                      : "https://i.imgur.com/BZCx7SW.png"
                  }
                  recipeName={recipe.name ? recipe.name : "A recipe"}
                  recipePrice={recipe.price ? recipe.price : "00.00"}
                  recipePreview={
                    recipe.recipePictureUrl
                      ? recipe.recipePictureUrl
                      : "https://i.imgur.com/dD69dIa.png"
                  }
                  recipePortion={
                    recipe.portionDescription
                      ? recipe.portionDescription
                      : "Meal for 2"
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchRecipes;
