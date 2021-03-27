import React from "react";
import RecipeModal from "./RecipeModal";
import CartModal from "./CartModal";
import TestEditProfile from "./TestEditProfile";

// open, onClose, selectedValue,
const DialogControl = ({ control, ...rest }) => {
  // const getComponent = () => {
  switch (control) {
    case "EditProfile":
      return <TestEditProfile {...rest} />;
    case "CreateProfile":
      return <TestEditProfile create={true} {...rest} />;
    case "AddRecipe":
      return <RecipeModal {...rest} />;
    case "EditRecipe":
      return <RecipeModal edit={true} {...rest} />;
    case "cart":
      return <CartModal {...rest} />;
    default:
      return null;
  }
};

export default DialogControl;
