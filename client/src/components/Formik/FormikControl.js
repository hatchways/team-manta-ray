import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";

function FormikControl({ control, ...rest }) {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
