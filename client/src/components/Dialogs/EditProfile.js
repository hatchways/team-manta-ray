import { Button, Dialog, DialogTitle } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/FormikControl";
import { makeStyles } from "@material-ui/core/styles";
import EditPicture from "./EditPicture";
import { UserContext, UserDispatchContext } from "../../context/UserContext";
import { updateUser } from "../../actions/userActions";

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
  const { userInfo } = useContext(UserContext);

  const dispatch = useContext(UserDispatchContext);

  const [profileInfo, setProfileInfo] = useState(profile ? profile : null);

  const [profilePictureUrl, setprofilePictureUrl] = useState(
    create ? "" : profileInfo.profilePictureUrl
  );

  const initialValues = {
    name: userInfo.name,
    address1: userInfo.address === undefined ? "" : userInfo.address.address1,
    address2: userInfo.address === undefined ? "" : userInfo.address.address2,
    city: userInfo.address === undefined ? "" : userInfo.address.city,
    province: userInfo.address === undefined ? "" : userInfo.address.province,
    zip: userInfo.address === undefined ? "" : userInfo.address.zip,
    bio: create ? "" : profileInfo.bio,
    cuisines: create
      ? ""
      : profileInfo.cuisines
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(","),
  };

  const ChefValidationSchema = Yup.object({
    // location: Yup.string().required("Location is required"),
    cuisines: Yup.string().required("Cuisine Tags are required"),
    name: Yup.string().required("Name is required"),
    address1: Yup.string().required("address1 is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string()
      .required("Proivince is required")
      .max(2, "Enter 2 digit province"),
    zip: Yup.string().required("Zip is required"),
  });
  const UserValidationSchema = Yup.object({
    // location: Yup.string().required("Location is required"),
    name: Yup.string().required("Name is required"),
    address1: Yup.string().required("address1 is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string()
      .required("Proivince is required")
      .max(2, "Enter 2 digit province"),
    zip: Yup.string().required("Zip is required"),
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

    let payload = {};

    payload.values = values;
    payload.profilePictureUrl = profilePictureUrl;

    try {
      const updatedUser = await updateUser(dispatch, payload);
      if (updatedUser) {
        setProfileInfo(updatedUser);
        setProfile(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
    onClose(selectedValue);
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
                {/* <FormikControl
                control="input"
                type="text"
                label="Location"
                name="location"
                placeholder="*Required"
              /> */}
                <FormikControl
                  control="input"
                  type="text"
                  label="Address Line 1*"
                  name="address1"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Address Line 2"
                  name="address2"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="City*"
                  name="city"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Province*"
                  name="province"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Zip Code*"
                  name="zip"
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
