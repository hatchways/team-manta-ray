import React, { useState, useContext } from "react";
import { Badge, IconButton } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DialogControl from "./Dialogs/DialogControl";
import { UserContext } from "../context/UserContext";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(3),
  },
  icon: {
    fontSize: 40,
    justifyContent: "end",
    color: "black",
  },
}));

const CartIcon = () => {
  const classes = useStyles();

  const { cart } = useContext(UserContext);
  console.log(cart);
  const [cartOpen, setCartOpen] = useState(false);

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
        <StyledBadge
          badgeContent={cart && cart.reduce((acc, cur) => acc + cur.qty, 0)}
          color="secondary"
          className={classes.icon}
        >
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <DialogControl open={cartOpen} onClose={handleCartClose} control="cart" />
    </>
  );
};

export default CartIcon;
