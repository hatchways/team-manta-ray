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
  // root: {
  //   minWidth: theme.spacing(70),
  // },
  root: {
    minWidth: "70%",
  },
  table: {
    tableLayout: "fixed",
  },
  img: {
    height: theme.spacing(25),
    width: theme.spacing(25),
    margin: "auto",
    borderRadius: "50%",
  },
  emptyText: {
    padding: theme.spacing(20, 10),
  },
  chefCard: {
    margin: "10px auto",
    marginBottom: theme.spacing(2),
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

const CartModal = () => {
  const classes = useStyles();

  const { cart, chosenChefProfile } = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

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
    <>
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
              justify="space-between"
              alignItems="center"
              spacing={2}
              md={9}
              xs={11}
              square
              component={Card}
              className={classes.chefCard}
            >
              <Grid item>
                <Typography>Chef</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" align="center">{`${
                  chosenChefProfile && chosenChefProfile.user.name
                }`}</Typography>
              </Grid>
              <Grid item>
                <img
                  src={
                    chosenChefProfile
                      ? chosenChefProfile.profilePictureUrl
                      : defaultUserImage
                  }
                  alt="profileImage"
                  className={classes.img}
                />
              </Grid>
              <Grid
                item
                container
                direction="row"
                justify="space-around"
                alignItems="flex-start"
              >
                <Grid
                  container
                  item
                  direction="column"
                  justify="space-evenly"
                  alignItems="flex-start"
                  xs={6}
                  spacing={1}
                >
                  <Grid item>
                    <Typography variant="body2">Bio:</Typography>
                  </Grid>
                  <Grid item>
                    <span>{chosenChefProfile && chosenChefProfile.bio}</span>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  direction="column"
                  justify="space-evenly"
                  alignItems="flex-start"
                  xs={6}
                  spacing={1}
                >
                  <Grid item>
                    <Typography variant="body2">Specialties:</Typography>
                  </Grid>
                  <Grid item>
                    <span>
                      {chosenChefProfile &&
                        chosenChefProfile.cuisineTags.join(",")}
                    </span>
                  </Grid>
                </Grid>
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
              {cart.map(({ qty, recipe }) => (
                <Grid
                  container
                  item
                  key={recipe._id}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  component={Card}
                  // padding={5}
                  xs={12}
                  className={classes.recipeCardItem}
                >
                  <Grid item xs={2}>
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
                      <span>{qty}</span>{" "}
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
                    <Grid
                      item
                      container
                      direction="column"
                      justify="space-around"
                      alignItems="flex-start"
                      spacing={2}
                      xs={3}
                    >
                      <Grid item>
                        <Typography variant="body2">
                          $ {recipe.price}
                        </Typography>
                      </Grid>
                      <Grid item> $ {addDecimals(qty * recipe.price)}</Grid>
                    </Grid>
                  </Hidden>
                  <Grid item xs={1}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => handleDelete(recipe._id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
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
                    (acc, cur) => acc + cur.recipe.price * cur.qty,
                    0
                  ),
                  2
                )}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.btnSection}>
            <Link to="/messages" className={classes.btn}>
              <Button variant="contained" color="secondary">
                Contact Chef
              </Button>
            </Link>
            <Link to="/payment" className={classes.btn}>
              <Button variant="contained" color="secondary">
                Proceed to checkout
              </Button>
            </Link>
          </ListItem>
        </List>
      )}
    </>
  );
};

export default CartModal;
