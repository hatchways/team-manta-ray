import {
  Button,
  DialogTitle,
  FormLabel,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditPicture from "./EditPicture";

const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: "0",
    height: theme.spacing(7),
    marginTop: theme.spacing(3),
    textTransform: "capitalize",
  },
  listItem: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    margin: "3px 0",
  },
}));

const EditProfile = () => {
  const classes = useStyles();

  const [value, setValue] = useState("Toronto");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <DialogTitle id="simple-dialog-title">Edit Profile</DialogTitle>
      <EditPicture profile={true} />
      <List>
        <ListItem className={classes.listItem}>
          <FormLabel className={classes.label}>Picture Key</FormLabel>
          <TextField
            name="pictureKey"
            variant="outlined"
            fullWidth
            value={value}
            onChange={handleChange}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <FormLabel className={classes.label}>Location</FormLabel>
          <TextField
            name="location"
            variant="outlined"
            fullWidth
            value={value}
            onChange={handleChange}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <FormLabel className={classes.label}>Name</FormLabel>
          <TextField
            name="name"
            variant="outlined"
            fullWidth
            value={value}
            onChange={handleChange}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <FormLabel className={classes.label}>Bio</FormLabel>
          <TextField
            name="bio"
            variant="outlined"
            fullWidth
            value={value}
            onChange={handleChange}
          />
        </ListItem>
        <ListItem>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.btn}
            fullWidth
          >
            Submit
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default EditProfile;
