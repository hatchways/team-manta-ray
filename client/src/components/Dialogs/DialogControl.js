import { Dialog } from "@material-ui/core";
import React from "react";
import RecipeModal from "./RecipeModal";
import EditProfile from "./EditProfile";
import CartModal from "./CartModal";

const DialogControl = ({ open, onClose, selectedValue, control, ...rest }) => {
  const getComponent = () => {
    switch (control) {
      case "image":
      case "location":
      case "name":
        return <EditProfile {...rest} />;
      case "CreateProfile":
        return <EditProfile create={true} {...rest} />;
      case "AddRecipe":
        return <RecipeModal {...rest} />;
      case "EditRecipe":
        return <RecipeModal edit={true} {...rest} />;
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
