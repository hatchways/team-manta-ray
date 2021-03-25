import {
  Avatar,
  Button,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Table,
  Hidden,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  ButtonGroup,
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
    height: theme.spacing(25),
    width: theme.spacing(25),
    margin: "auto",
    borderRadius: "50%",
  },
  emptyText: {
    padding: theme.spacing(20, 10),
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

  return (
    <>
      <DialogTitle id="simple-dialog-title">Cart Items</DialogTitle>
      {cart.length === 0 ? (
        <Typography
          gutterBottom
          variant="h6"
          color="secondary"
          align="center"
          className={classes.emptyText}
        >
          {" "}
          Your Cart Is Empty
        </Typography>
      ) : (
        <List dense>
          <ListItem dense>
            <Button
              variant="contained"
              className={classes.clearBtn}
              onClick={() => clearCart(dispatch)}
            >
              clear cart
            </Button>
          </ListItem>
          <ListItem alignItems="center">
            <ListItemText>
              <Typography variant="h5" align="center">{`chef: ${
                chosenChefProfile && chosenChefProfile.user.name
              }`}</Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <img
              src={
                chosenChefProfile
                  ? chosenChefProfile.profilePictureUrl
                  : defaultUserImage
              }
              alt="profileImage"
              className={classes.img}
            />
          </ListItem>
          <ListItem divider>
            <ListItemText>
              <Typography variant="h6">Bio</Typography>
              <span>{chosenChefProfile && chosenChefProfile.bio}</span>
            </ListItemText>
            <ListItemText>
              <Typography variant="h6">Experts In:</Typography>
              <span>
                {chosenChefProfile && chosenChefProfile.cuisineTags.join(",")}
              </span>
            </ListItemText>
          </ListItem>
          <ListItem dense>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Menu</TableCell>

                    <Hidden smDown>
                      <TableCell align="left">Qty</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">Price</TableCell>
                    </Hidden>

                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map(({ qty, recipe }) => (
                    <TableRow key={recipe._id}>
                      <TableCell component="th" scope="item">
                        <Avatar
                          alt="Remy Sharp"
                          src={recipe.recipePictureUrl || plate}
                        />
                      </TableCell>
                      <TableCell align="justify">{recipe.name}</TableCell>
                      <Hidden smDown>
                        <TableCell align="justify" nowrap="nowrap">
                          <span>{qty}</span>{" "}
                          <ButtonGroup
                            disableElevation
                            variant="contained"
                            className={classes.btnGroup}
                          >
                            <Button
                              onClick={() =>
                                qty > 1
                                  ? decreaseCount(dispatch, {
                                      id: recipe._id,
                                      qty: qty - 1,
                                      chef: recipe.user,
                                    })
                                  : removeFromCart(dispatch, recipe._id)
                              }
                            >
                              -
                            </Button>
                            <Button
                              onClick={() =>
                                increaseCount(dispatch, {
                                  id: recipe._id,
                                  qty: qty + 1,
                                  chef: recipe.user,
                                })
                              }
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </Hidden>
                      <Hidden smDown>
                        <TableCell align="right">{`${
                          recipe.price
                        }x${qty}=${addDecimals(
                          qty * recipe.price
                        )}`}</TableCell>
                      </Hidden>
                      <TableCell
                        align="right"
                        onClick={(e) => handleDelete(recipe._id)}
                      >
                        <IconButton edge="end" aria-label="delete">
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
            <Link to="/checkout" className={classes.btn}>
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
