import { Button, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/FormikControl";
import { makeStyles } from "@material-ui/core/styles";
import EditPicture from "./EditPicture";

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

const RecipeModal = ({ edit }) => {
  const classes = useStyles();

  const [pictureKey, setPictureKey] = useState(null);

  const initialValues = {
    name: "",
    price: 0,
    ingredients: "",
    requiredStuff: "",
    portionDescription: "",
    cuisineTags: "",
    pictureKey: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name of the recipe is required"),
    price: Yup.number("Price should be a number")
      .required("Price is required")
      .positive("Price should be positive"),
    ingredients: Yup.string().required("Ingredients of the recipe is required"),
    portionDescription: Yup.string().required(
      "Portion Description is required"
    ),
    cuisineTags: Yup.string().required("Cuisine Tags are required"),
  });

  const onSubmit = async (values) => {
    console.log({ ...values, pictureKey });
  };

  return (
    <div>
      <DialogTitle id="simple-dialog-title">
        {edit ? "Edit Recipe" : "Add a recipe"}
      </DialogTitle>
      <EditPicture setPictureKey={setPictureKey} />
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
                label="Price"
                name="price"
              />
              <FormikControl
                control="input"
                type="text"
                label="Ingredients"
                name="ingredients"
                helperText="please provide a comma separated list"
              />
              <FormikControl
                control="input"
                type="text"
                label="Required Stuff"
                name="requiredStuff"
                helperText="please provide a comma separated list"
              />
              <FormikControl
                control="input"
                type="text"
                label="Portion Description"
                name="portionDescription"
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

export default RecipeModal;
