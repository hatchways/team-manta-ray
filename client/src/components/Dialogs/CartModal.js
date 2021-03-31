import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  ButtonGroup,
  Grid,
  Card,
  Hidden,
  Dialog,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import defaultUserImage from "../../assets/defaultUserImage.png";
import plate from "../../assets/plate.svg";
import { UserContext, UserDispatchContext } from "../../context/UserContext";
import {
  removeFromCart,
  decreaseCount,
  increaseCount,
  clearCart,
} from "../../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
  },
  img: {
    height: theme.spacing(12),
    width: theme.spacing(12),
    objectFit: "cover",
    margin: "auto",
    borderRadius: "50%",
  },
  emptyText: {
    padding: theme.spacing(20, 10),
  },
  chefCard: {
    padding: theme.spacing(2),
    // margin: "10px auto",
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.1),
      margin: "0",
      marginBottom: theme.spacing(1),
    },
  },
  recipeCard: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.1),
    },
  },
  recipeCardItem: {
    padding: theme.spacing(1),

    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.1),
    },
  },
  btn: {
    borderRadius: "0",
    margin: "auto",
    width: "40%",
    height: theme.spacing(6),
    textDecoration: "none",
    textTransform: "capitalize",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(1.2),
    },
    "& button": {
      height: "100%",
      width: "100%",
      borderRadius: "0",
      textTransform: "capitalize",
    },
  },
  clearBtn: {
    borderRadius: "0",
    textTransform: "capitalize",
  },

  btnGroup: {
    "& button": {
      borderRadius: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
}));

const CartModal = ({ open, onClose, selectedValue }) => {
  const classes = useStyles();

  const { cart, chosenChefProfile } = useContext(UserContext);

  const dispatch = useContext(UserDispatchContext);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  const handleDelete = (id) => {
    removeFromCart(dispatch, id);
  };

  const handleIncrease = (id, qty, chef) => {
    increaseCount(dispatch, {
      id,
      qty: qty + 1,
      chef,
    });
  };
  const handleDecrease = (id, qty, chef) => {
    qty > 1
      ? decreaseCount(dispatch, {
          id,
          qty: qty - 1,
          chef,
        })
      : removeFromCart(dispatch, id);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth={true}
    >
      {cart.length === 0 ? (
        <Typography
          gutterBottom
          variant="h6"
          color="secondary"
          align="center"
          className={classes.emptyText}
        >
          Your Cart Is Empty
        </Typography>
      ) : (
        <List dense className={classes.root}>
          <ListItem dense>
            <ListItemText>
              <Typography variant="h6">Cart Items</Typography>
            </ListItemText>
            <Button
              variant="contained"
              className={classes.clearBtn}
              onClick={() => clearCart(dispatch)}
            >
              clear cart
            </Button>
          </ListItem>

          <ListItem alignItems="center">
            <Grid
              container
              item
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
              square
              component={Card}
              className={classes.chefCard}
            >
              <Grid item>
                <Typography>Chef</Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <img
                    src={
                      chosenChefProfile && chosenChefProfile.profilePictureUrl
                        ? chosenChefProfile.profilePictureUrl
                        : defaultUserImage
                    }
                    alt="profileImage"
                    className={classes.img}
                  />
                </Grid>
                <Hidden smDown>
                  <Grid item container direction="column" xs={9}>
                    <Grid item container direction="row" spacing={1}>
                      <Grid item>
                        <Typography>Name:</Typography>
                      </Grid>
                      <Grid item>
                        {`${chosenChefProfile && chosenChefProfile.name}`}
                      </Grid>
                    </Grid>
                    <Grid item container direction="row" spacing={1}>
                      <Grid item>
                        <Typography>Bio:</Typography>
                      </Grid>
                      <Grid item>
                        {`${
                          chosenChefProfile && chosenChefProfile.bio
                            ? chosenChefProfile.bio
                            : ""
                        }`}
                      </Grid>
                    </Grid>
                    <Grid item container direction="row" spacing={1}>
                      <Grid item>
                        <Typography>Specialties:</Typography>
                      </Grid>
                      <Grid item>
                        {`${
                          chosenChefProfile && chosenChefProfile.cuisines
                            ? chosenChefProfile.cuisines
                            : ""
                        }`}
                      </Grid>
                    </Grid>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="center"
              className={classes.recipeCard}
            >
              {cart.map(({ qty, recipe }) => {
                if (!recipe) return null;
                return (
                  <Grid
                    container
                    item
                    key={recipe._id}
                    direction="row"
                    alignItems="center"
                    justify="space-between"
                    component={Card}
                    xs={12}
                    className={classes.recipeCardItem}
                  >
                    <Grid item xs={1}>
                      <Avatar
                        alt="recipe"
                        src={recipe.recipePictureUrl || plate}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="column"
                      justify="space-around"
                      alignItems="flex-start"
                      xs={6}
                      spacing={1}
                    >
                      <Grid item>
                        <Typography>{recipe.name}</Typography>
                      </Grid>
                      <Grid item>
                        <span>{`${qty} x $${recipe.price}`}</span>{" "}
                        <ButtonGroup
                          disableElevation
                          variant="contained"
                          className={classes.btnGroup}
                        >
                          <Button
                            onClick={() =>
                              handleDecrease(recipe._id, qty, recipe.user)
                            }
                          >
                            -
                          </Button>
                          <Button
                            onClick={() =>
                              handleIncrease(recipe._id, qty, recipe.user)
                            }
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                    <Hidden smDown>
                      <Grid item>$ {addDecimals(qty * recipe.price)}</Grid>
                    </Hidden>
                    <Grid item xs={2} md={1}>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(e) => handleDelete(recipe._id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography gutterBottom variant="h6">
                Total Price
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography gutterBottom variant="h6">
                {" "}
                $
                {addDecimals(
                  cart.reduce(
                    (acc, cur) =>
                      cur.recipe ? acc + cur.recipe.price * cur.qty : acc + 0,
                    0
                  ),
                  2
                )}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.btnSection}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/messages"
              onClick={handleClose}
              className={classes.btn}
            >
              Contact Chef
            </Button>

            <Button
              variant="contained"
              color="secondary"
              component={Link}
              className={classes.btn}
              to="/payment"
              onClick={handleClose}
            >
              Proceed to checkout
            </Button>
          </ListItem>
        </List>
      )}
    </Dialog>
  );
};

export default CartModal;
