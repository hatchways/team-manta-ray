import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../../hooks/useUplaodImage";
import { List, ListItem, Snackbar } from "@material-ui/core";
import defaultUserImage from "../../assets/defaultUserImage.png";
import plate from "../../assets/plate.svg";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Loader from "../Loader";

const useStyles = makeStyles((theme) =>
  createStyles({
    img: {
      height: theme.spacing(25),
      width: theme.spacing(25),
      margin: "auto",
      borderRadius: "50%",
    },
    notRound: {
      height: theme.spacing(25),
      width: theme.spacing(25),
      margin: "auto",
    },
    uploadSection: {
      height: theme.spacing(10),
      // width: theme.spacing(50),
      width: "95%",
      outline: "none",
      border: "3px dotted #ccc",
      margin: "auto",
      "& p": {
        color: "#999",
        textAlign: "center",
      },
    },
    loader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    fieldImg: {
      height: theme.spacing(5),
      width: theme.spacing(5),
      float: "left",
      borderRadius: "50%",
    },
  })
);

const EditPicture = ({ profile, srcData, setSrcData, recipe }) => {
  const classes = useStyles();

  const [src, setSrc] = useState(srcData ? srcData : null);
  const [err, setErr] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadImage = useUploadImage();

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const onDrop = useCallback(
    async (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setErr("Invalid file type.");
        setSnackBarOpen(true);
        return;
      }
      if (acceptedFiles.length > 0) setLoading(true);
      const res = await uploadImage(acceptedFiles[0]);
      setLoading(false);
      if (res.key) {
        setSrcData(res.Location);
        setSrc(res.Location);
      } else {
        setErr(res);
        setSnackBarOpen(true);
      }
    },
    [uploadImage, setSrcData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <>
      <List>
        <ListItem>
          <img
            src={src ? src : profile ? defaultUserImage : plate}
            alt="profileImage"
            className={recipe ? classes.notRound : classes.img}
          />
        </ListItem>
        <ListItem alignItems="center" className={classes.loader}>
          {loading && <Loader />}
        </ListItem>
        <ListItem button autoFocus>
          <div className={classes.uploadSection} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <p>
                  Drag 'n' drop an image here.., or click here to select an
                  image
                </p>
              </>
            )}
          </div>
        </ListItem>
        <ListItem>
          <Snackbar
            open={snackBarOpen}
            onClose={handleSnackBarClose}
            message={err}
            autoHideDuration={4000}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          />
        </ListItem>
      </List>
    </>
  );
};

export default EditPicture;
