import React, { useState, useContext, useEffect } from "react";
import { Badge, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DialogControl from "./Dialogs/DialogControl";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import { getCartInfo } from "../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(3),
  },
  icon: {
    color: "black",
  },
}));

const CartIcon = () => {
  const classes = useStyles();

  const { cart } = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    getCartInfo(dispatch);
  }, [dispatch]);

  const handleCartClose = (value) => {
    setCartOpen(false);
  };

  const handleClickOpen = () => {
    setCartOpen(true);
  };
  return (
    <>
      <IconButton
        aria-label="cart"
        className={classes.menuButton}
        onClick={() => handleClickOpen("cart")}
      >
        <Badge
          badgeContent={cart && cart.reduce((acc, cur) => acc + cur.qty, 0)}
          color="secondary"
          className={classes.icon}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <DialogControl open={cartOpen} onClose={handleCartClose} control="cart" />
    </>
  );
};

export default CartIcon;
