import { Button, Dialog, DialogTitle } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/FormikControl";
import { makeStyles } from "@material-ui/core/styles";
import EditPicture from "./EditPicture";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2),
  },
  btn: {
    borderRadius: "0",
    width: "50%",
    height: theme.spacing(7),
    marginTop: theme.spacing(3),
    textTransform: "capitalize",
  },
  formGroup: {
    marginBottom: 20,
    height: theme.spacing(11),
  },
  label: {
    fontWeight: 900,
    fontSize: 12,
  },
  input: {
    margin: "3px 0",
    borderRadius: "0",
  },
}));

const EditProfile = ({
  create,
  profile,
  setProfile,
  isChef,
  open,
  onClose,
  selectedValue,
}) => {
  const classes = useStyles();

  const [profileInfo, setProfileInfo] = useState(profile ? profile : null);
  const [profilePictureUrl, setprofilePictureUrl] = useState(
    create ? "" : profileInfo.profilePictureUrl
  );
  const { userInfo } = useContext(UserContext);

  const initialValues = {
    name: userInfo.name,
    location: "",
    bio: create ? "" : profileInfo.bio,
    cuisines: create
      ? ""
      : profileInfo.cuisines
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(","),
  };

  const ChefValidationSchema = Yup.object({
    location: Yup.string().required("Location is required"),
    cuisines: Yup.string().required("Cuisine Tags are required"),
    name: Yup.string().required("Name is required"),
  });
  const UserValidationSchema = Yup.object({
    location: Yup.string().required("Location is required"),
    name: Yup.string().required("Name is required"),
  });
  const validationSchema = userInfo.isChef
    ? ChefValidationSchema
    : UserValidationSchema;

  const onSubmit = async (values) => {
    if (values.cuisines) {
      values.cuisines = values.cuisines
        .split(",")
        .map((c) => c.trim().toLowerCase());
    }

    const res = await axios.put(`/api/users`, {
      ...values,
      profilePictureUrl,
    });
    if (res.data) {
      setProfileInfo(res.data.updatedUser);
      setProfile(res.data.updatedUser);
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
      maxWidth="sm"
      fullWidth={true}
    >
      <div>
        <DialogTitle id="simple-dialog-title">Edit Profile</DialogTitle>
        <EditPicture
          profile={true}
          setSrcData={setprofilePictureUrl}
          srcData={profilePictureUrl}
        />
        <div className={classes.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  label="Name"
                  name="name"
                  placeholder="*Required"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Location"
                  name="location"
                  placeholder="*Required"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label={userInfo.isChef ? `Bio` : `About`}
                  name="bio"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label={userInfo.isChef ? `Cuisine Tags` : `Faviorit Cuisines`}
                  name="cuisines"
                  helperText="please provide a comma separated list"
                  placeholder={userInfo.isChef ? "*Required" : ""}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.btn}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfile;
