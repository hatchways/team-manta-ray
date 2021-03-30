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

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    borderRadius: 0,
    boxShadow: "0px 10px 10px 0px rgba(204, 204, 204, 0.5)",
  },
  media: {
    height: 140,
  },
  portion: {
    backgroundColor: "#FF743D",
    color: "white",
    fontSize: "8px",
    padding: "3px 8px",
    textTransform: "uppercase",
    display: "inline-block",
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 700,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 500,
  },
  price: {
    fontSize: 10,
    color: "#FF510C",
    fontWeight: 700,
    marginTop: 7,
    marginBottom: 15,
  },
});

const SearchRecipesCard = ({
  chefName,
  chefProfilePic,
  recipeName,
  recipePrice,
  recipePreview,
  recipePortion,
}) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root} variant="elevation">
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
        <CardContent style={{ paddingBottom: "12px", paddingTop: "12px" }}>
          <Grid container>
            <Grid item xs={3}>
              <Avatar style={{ height: 30, width: 30 }} src={chefProfilePic} />
            </Grid>
            <Grid item container xs={8}>
              <Grid item xs={12}>
                <Typography
                  style={{ fontSize: 12, fontWeight: 500 }}
                  variant="h4"
                >
                  {chefName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 8, opacity: 0.6 }} variant="h5">
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
