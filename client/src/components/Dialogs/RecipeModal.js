import { Button, DialogTitle, TextField, Typography } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/FormikControl";
import { makeStyles } from "@material-ui/core/styles";
import EditPicture from "./EditPicture";
import {
  RecipeContext,
  RecipeDispatchContext,
} from "../../context/recipe-context";
import { createRecipe } from "../../actions/recipeActions";

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

const RecipeModal = ({ edit, id }) => {
  const classes = useStyles();

  const { recipe, addRecipe } = useContext(RecipeContext);
  const dispatch = useContext(RecipeDispatchContext);

  const [pictureKey, setPictureKey] = useState(null);

  const initialValues = {
    name: edit ? recipe.name : "",
    price: edit ? recipe.price : 0,
    ingredients: edit ? recipe.ingredients : "",
    requiredStuff: edit ? recipe.requiredStuff : "",
    portionDescription: edit ? recipe.portionDescription : "",
    cuisineTags: edit ? recipe.cuisineTags : "",
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
    await createRecipe(dispatch, { ...values, pictureKey });
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
              <div className={classes.formGroup}>
                <label htmlFor="pictureLey">
                  <Typography variant="h6" className={classes.label}>
                    Picture Key
                  </Typography>
                </label>
                <TextField
                  name="pictureKey"
                  className={classes.input}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={pictureKey}
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText="This field is read only and will be filled after you provide your image"
                />
              </div>
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
