import { Dialog } from "@material-ui/core";
import React from "react";
import RecipeModal from "./RecipeModal";
import CartModal from "./CartModal";
import EditProfile from "./EditProfile";
import OrderDetails from "./OrderDetails";

const DialogControl = ({ open, onClose, selectedValue, control, ...rest }) => {
  const getComponent = () => {
    switch (control) {
      case "EditProfile":
        return <EditProfile {...rest} />;
      case "CreateProfile":
        return <EditProfile create={true} {...rest} />;
      case "AddRecipe":
        return <RecipeModal {...rest} />;
      case "EditRecipe":
        return <RecipeModal edit={true} {...rest} />;
      case "OrderDetails":
        return <OrderDetails {...rest} />;

      case "cart":
        return <CartModal />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {getComponent()}
    </Dialog>
  );
};

export default DialogControl;
