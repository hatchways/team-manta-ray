import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import plate from "../assets/plate.svg";
import DialogControl from "./Dialogs/DialogControl";
import { UserDispatchContext, UserContext } from "../context/UserContext";
import {
  addToCart,
  getChosenChefProfile,
  setChefConflictError,
} from "../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({ id, isOwner }) {
  const { recipes } = useContext(UserContext);
  const recipe = recipes.filter((res) => res._id === id)[0];
  const {
    name,
    price,
    ingredients,
    requiredStuff,
    portionDescription,
    cuisineTags,
    recipePictureUrl,
  } = recipe;

  const globalDispatch = useContext(UserDispatchContext);
  const { cart, chosenChefProfile } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = (e) => {
    // if the user is its own profile open add recipe
    if (isOwner) {
      setOpen(true);
      //if user is visiting other chef's profile add item to cart
    } else {
      if (cart.length === 0) {
        getChosenChefProfile(globalDispatch, recipe.user);
        addToCart(globalDispatch, recipe);
      } else {
        const isSelectingFromADifferentChef =
          chosenChefProfile && chosenChefProfile._id !== recipe.user;
        if (isSelectingFromADifferentChef) {
          setChefConflictError(globalDispatch);
        } else {
          addToCart(globalDispatch, recipe);
        }
      }
    }
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={portionDescription}
        onClick={handleClickOpen}
      />
      <CardMedia
        className={classes.media}
        image={recipePictureUrl ? recipePictureUrl : plate}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="secondary" component="p">
          ${`${price}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Price:</Typography>
          <Typography paragraph>${`${price}`}</Typography>
          <Typography paragraph>Ingredients</Typography>
          <Typography paragraph>${`${ingredients}`}</Typography>
          <Typography paragraph>Required Stuff</Typography>
          <Typography paragraph>${`${requiredStuff}`}</Typography>
          <Typography paragraph>Cuisine Tags</Typography>
          <Typography paragraph>${`${cuisineTags}`}</Typography>
        </CardContent>
      </Collapse>
      <DialogControl
        open={open}
        onClose={handleClose}
        control="EditRecipe"
        recipe={recipe}
      />
    </Card>
  );
}
