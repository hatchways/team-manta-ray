import React, { useState } from "react";
import defaultUserImage from "../assets/defaultUserImage.png";
import DialogControl from "../components/Dialogs/DialogControl";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const ChefProfile = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleClickOpen = (e) => {
    setOpen(true);
    console.log(e.target);
    setId(e.target.id);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div>
      <img
        src={defaultUserImage}
        onClick={handleClickOpen}
        name="image"
        id="image"
        alt="profile"
        style={{ height: "100px", width: "100px", cursor: "pointer" }}
      />
      <input
        style={{ cursor: "pointer" }}
        onClick={handleClickOpen}
        name="location"
        id="location"
        value="Toronto, canada"
        readOnly
      />
      <input
        style={{ cursor: "pointer" }}
        onClick={handleClickOpen}
        name="name"
        id="name"
        value="Atsushi Mikazuki"
        readOnly
      />

      <PlaylistAddIcon
        id="AddRecipe"
        onClick={handleClickOpen}
        style={{ height: "50px", width: "50px", cursor: "pointer" }}
      />

      <DialogControl open={open} onClose={handleClose} id={id} />
    </div>
  );
};

export default ChefProfile;
