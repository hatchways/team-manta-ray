import { Button, DialogTitle } from "@material-ui/core";
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

const EditProfile = ({ create, profile, setProfile }) => {
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
    cuisineTags: create ? "" : profileInfo.cuisineTags,
  };

  const validationSchema = Yup.object({
    location: Yup.string().required("Location is required"),
    cuisineTags: Yup.string().required("Cuisine Tags are required"),
  });

  const onSubmit = async (values) => {
    // if (create) {
    //   const profile = await axios.put("/api/users", {
    //     ...values,
    //     profilePictureUrl,
    //   });
    //   setProfileInfo(profile);
    // } else {
    const profile = await axios.put(`/api/users/${userInfo._id}`, {
      ...values,
      profilePictureUrl,
    });
    setProfileInfo(profile);
  };

  return (
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
              />
              <FormikControl
                control="input"
                type="text"
                label="Location"
                name="location"
              />
              <FormikControl
                control="input"
                type="text"
                label="Bio"
                name="bio"
              />
              <FormikControl
                control="input"
                type="text"
                label="Cuisine Tags"
                name="cuisineTags"
                helperText="please provide a comma separated list"
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
  );
};

export default EditProfile;
