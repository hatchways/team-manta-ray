import { Dialog } from "@material-ui/core";
import React from "react";
import EditLocation from "./EditLocation";
import EditPicture from "./EditPicture";

const DialogControl = ({ open, onClose, selectedValue, control }) => {
  const getComponent = () => {
    switch (control) {
      case "image":
        return <EditPicture />;
      case "location":
        return <EditLocation />;
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
