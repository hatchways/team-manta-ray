import { Dialog } from "@material-ui/core";
import React from "react";
import RecipeModal from "./RecipeModal";
import EditProfile from "./EditProfile";

const DialogControl = ({ open, onClose, selectedValue, id }) => {
  const getComponent = () => {
    switch (id) {
      case "image":
      case "location":
      case "name":
        return <EditProfile />;
      case "AddRecipe":
        return <RecipeModal />;
      case "EditRecipe":
        return <RecipeModal edit={true} />;
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
