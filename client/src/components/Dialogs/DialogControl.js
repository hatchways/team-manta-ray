import React from "react";
import RecipeModal from "./RecipeModal";
import CartModal from "./CartModal";
import EditProfile from "./EditProfile";
import OrderDetails from "./OrderDetails";

// open, onClose, selectedValue,
const DialogControl = ({ control, ...rest }) => {
  // const getComponent = () => {
  switch (control) {
    case "EditProfile":
      return <EditProfile {...rest} />;
    case "CreateProfile":
      return <EditProfile create={true} {...rest} />;
    case "AddRecipe":
      return <RecipeModal {...rest} />;
    case "EditRecipe":
      return <RecipeModal edit={true} {...rest} />;
    case "cart":
      return <CartModal {...rest} />;
    case "OrderDetails":
      return <OrderDetails {...rest} />;
    default:
      return null;
  }
};

export default DialogControl;
