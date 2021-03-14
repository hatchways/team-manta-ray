import {
  Button,
  DialogTitle,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: "0",
    height: theme.spacing(7),
    marginTop: theme.spacing(3),
    textTransform: "capitalize",
  },
}));

const EditLocation = () => {
  const classes = useStyles();

  const [location, setLocation] = useState("Toronto");

  const handleChange = (e) => {
    setLocation(e.target.value);
  };
  return (
    <>
      <DialogTitle id="simple-dialog-title">Edit Your Location</DialogTitle>
      <List>
        <ListItem>
          <TextField
            name="location"
            variant="outlined"
            fullWidth
            value={location}
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

export default EditLocation;
