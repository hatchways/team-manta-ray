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
    // padding: theme.spacing(1, 4),
    borderRadius: "0",
    marginLeft: theme.spacing(3),
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
  btnSection: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(0.5),
  },
  btnGroup: {
    "& button": {
      borderRadius: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
}));

const CartModal = ({ chef }) => {
  const classes = useStyles();

  const { cart } = useContext(UserContext);
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
          <ListItem>
            <ListItemText>{`chef:`}</ListItemText>
            <Button
              startIcon
              variant="contained"
              className={classes.clearBtn}
              onClick={() => clearCart(dispatch)}
            >
              clear cart
            </Button>
          </ListItem>
          <ListItem>
            <img
              src={defaultUserImage}
              alt="profileImage"
              className={classes.img}
            />
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
                    <TableCell align="right">Menu</TableCell>

                    <Hidden smDown>
                      <TableCell align="left">Qty</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="right">Price</TableCell>
                    </Hidden>

                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item, idx) => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="item">
                        <Avatar
                          alt="Remy Sharp"
                          src={item.recipePictureUrl || plate}
                        />
                      </TableCell>
                      <TableCell align="right">{item.name}</TableCell>
                      <Hidden smDown>
                        <TableCell align="justify" nowrap="nowrap">
                          <span>{item.count}</span>{" "}
                          <ButtonGroup
                            disableElevation
                            variant="contained"
                            className={classes.btnGroup}
                          >
                            <Button
                              onClick={() =>
                                item.count > 1
                                  ? decreaseCount(dispatch, item._id)
                                  : removeFromCart(dispatch, item._id)
                              }
                            >
                              -
                            </Button>
                            <Button
                              onClick={() => increaseCount(dispatch, item._id)}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </Hidden>
                      <Hidden smDown>
                        <TableCell align="right">{`${item.price}x${
                          item.count
                        }=${addDecimals(item.count * item.price)}`}</TableCell>
                      </Hidden>
                      <TableCell
                        align="right"
                        onClick={(e) => handleDelete(item._id)}
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
                  cart.reduce((acc, cur) => acc + cur.price * cur.count, 0),
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
