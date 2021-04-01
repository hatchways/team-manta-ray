import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterChefs from "../components/BrowseChefs/FilterChefs";
import Chefs from "../components/BrowseChefs/Chefs";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const BrowseChefs = (props) => {
  const useStyles = makeStyles((theme) => ({
    title: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },
    root: {
      marginTop: 65,
      overflow: "hidden",
    },
    sideBar: {
      width: "100%",
      marginTop: 10,
      marginLeft: 30,
    },
    results: {
      marginTop: 10,
      marginLeft: 5,
      marginBottom: 20,
      height: "100%",
    },
    filterHeader: {
      fontSize: "25px",
      fontWeight: 600,
      marginBottom: 15,
      marginTop: 20,
    },
    cuisineTag: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 700,
      fontSize: "17px",
      padding: "6px 12px",
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
      fontSize: "22px",
    },
    menuItem: {
      fontSize: "20px",
    },
    sideBarGrid: {
      backgroundColor: "white",
      minHeight: "95vh",
    },
  }));

  const { userInfo } = useContext(UserContext);

  console.log(userInfo.location);

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

  const [chefs, setChefs] = useState([]);

  const [params, setParams] = useState({
    cuisines: [],
    maxDistance: "None",
  });

  useEffect(() => {
    const getInitialChefs = async () => {
      try {
        const res = await axios.get(url, { params: { chefs: true } });
        const data = res.data.data;
        console.log(data);
        setChefs(data);
      } catch (error) {
        console.log(error);
      }
    };
    getInitialChefs();
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
    setParams({ ...params, maxDistance: e.target.value });
  };

  const filterButtonHandler = async () => {
    try {
      let maxDistanceParam = params.maxDistance;
      if (maxDistanceParam === "None") {
        maxDistanceParam = "0";
      }
      const res = await axios.get(url, {
        params: {
          chefs: true,
          cuisines: params.cuisines.join(),
          maxdistance: maxDistanceParam,
          location: `[${userInfo.location.coordinates[0]},${userInfo.location.coordinates[1]}]`,
        },
      });
      const data = res.data.data;
      setChefs(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item container xs={3} className={classes.sideBarGrid}>
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
                    fontSize: "22px",
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
                        fontSize: "17px",
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
              <Grid item xs={12} style={{ marginBottom: 80 }}>
                <Select
                  value={params.maxDistance}
                  onChange={selectChangeHandler}
                  displayEmpty
                  style={{ fontSize: "20px" }}
                >
                  <MenuItem className={classes.menuItem} value={"None"}>
                    <em>No Max Distance</em>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value={"10"}>
                    10km
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value={"20"}>
                    20km
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value={"30"}>
                    30km
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value={"50"}>
                    50km
                  </MenuItem>
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
      <Grid item xs={9}>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Box
              className={classes.title}
              display="flex"
              justifyContent="center"
            >
              <Typography variant="h4">Available Chefs:</Typography>
            </Box>
            <Grid container spacing={2}>
              {chefs.length > 0 ? (
                chefs.map((chef, i) => (
                  <Chefs
                    key={`${chef.name}${i}`}
                    chefProfileUrl={chef.profilePictureUrl}
                    name={chef.name}
                    location={
                      chef.address
                        ? `${chef.address.city}, ${chef.address.province}`
                        : ""
                    }
                    cuisineTags={chef.cuisines}
                    bio={chef.bio}
                    link={`/chefprofile/${chef._id}`}
                  />
                ))
              ) : (
                <Box>No chefs found</Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BrowseChefs;
