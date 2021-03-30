import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Divider,
  Avatar,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 450,
    borderRadius: 0,
    boxShadow: "0px 10px 10px 0px rgba(204, 204, 204, 0.5)",
    cursor: "pointer",
  },
  media: {
    height: 200,
  },
  portion: {
    backgroundColor: "#FF743D",
    color: "white",
    fontSize: "15px",
    padding: "6px 16px",
    textTransform: "uppercase",
    display: "inline-block",
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 700,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 500,
    marginTop: 10,
    marginLeft: 10,
  },
  price: {
    fontSize: 17,
    color: "#FF510C",
    fontWeight: 700,
    marginTop: 7,
    marginBottom: 50,
    marginLeft: 10,
  },
});

const SearchRecipesCard = ({
  chefName,
  chefProfilePic,
  recipeName,
  recipePrice,
  recipePreview,
  recipePortion,
  link,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const recipeClickHandler = () => {
    history.push(link);
  };
  return (
    <>
      <Card
        className={classes.root}
        variant="elevation"
        onClick={recipeClickHandler}
      >
        <CardMedia
          className={classes.media}
          image={recipePreview}
          title="Recipe Preview"
        >
          <h3 className={classes.portion}>{recipePortion}</h3>
        </CardMedia>
        <CardContent>
          <Typography component="h1" variant="h1" className={classes.titleText}>
            {recipeName}
          </Typography>
          <Typography variant="h6" className={classes.price}>
            ${recipePrice}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent style={{ paddingBottom: "20px", paddingTop: "20px" }}>
          <Grid container>
            <Grid item xs={3}>
              <Avatar style={{ height: 50, width: 50 }} src={chefProfilePic} />
            </Grid>
            <Grid item container xs={8}>
              <Grid item xs={12}>
                <Typography
                  style={{ fontSize: 18, fontWeight: 500 }}
                  variant="h4"
                >
                  {chefName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 14, opacity: 0.6 }} variant="h5">
                  Toronto, Canada
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default SearchRecipesCard;
