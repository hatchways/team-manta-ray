import React, { useState } from "react";
import defaultUserImage from "../assets/defaultUserImage.png";
import EditPicture from "../components/EditPicture";

const ChefProfile = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div>
      <img
        src={defaultUserImage}
        onClick={handleClickOpen}
        alt="profile"
        style={{ height: "100px", width: "100px", cursor: "pointer" }}
      />
      <EditPicture open={open} onClose={handleClose} />
    </div>
  );
};

export default ChefProfile;
