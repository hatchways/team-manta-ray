import { Button, DialogTitle, Fab } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/FormikControl";
import { makeStyles } from "@material-ui/core/styles";
import EditPicture from "./EditPicture";
import { RecipeDispatchContext } from "../../context/recipe-context";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
} from "../../actions/recipeActions";

export const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2),
  },
  btn: {
    borderRadius: "0",
    width: "40%",
    height: theme.spacing(7),
    margin: "0 3px",
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

const RecipeModal = ({ edit, id, recipe }) => {
  const classes = useStyles();

  // const { recipe } = useContext(RecipeContext);

  const dispatch = useContext(RecipeDispatchContext);

  const [pictureKey, setPictureKey] = useState(edit ? recipe.pictureKey : "");
  const [srcData, setSrsData] = useState(edit ? recipe.srcData : "");

  const initialValues = {
    name: edit ? recipe.name : "",
    price: edit ? recipe.price : 0,
    ingredients: edit ? recipe.ingredients.join(",") : "",
    requiredStuff: edit ? recipe.requiredStuff.join(",") : "",
    portionDescription: edit ? recipe.portionDescription : "",
    cuisineTags: edit ? recipe.cuisineTags.join(",") : "",
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
    if (edit) {
      editRecipe(dispatch, { ...values, pictureKey, srcData, _id: recipe._id });
    } else {
      await createRecipe(dispatch, {
        ...values,
        pictureKey,
        srcData,
      });
    }
  };

  return (
    <div>
      {edit && (
        <Fab
          color="primary"
          onClick={() => deleteRecipe(dispatch, recipe._id)}
          style={{
            float: "right",
            margin: "4px",
            width: "40px",
            height: "40px",
          }}
        >
          <DeleteForeverIcon />
        </Fab>
      )}
      <DialogTitle id="simple-dialog-title">
        {edit ? `Edit "${recipe.name}" Recipe` : "Add a recipe"}
      </DialogTitle>

      <EditPicture
        setPictureKey={setPictureKey}
        srcData={srcData}
        setSrcData={setSrsData}
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
