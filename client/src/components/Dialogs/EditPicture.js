import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../../hooks/useUplaodImage";
import useGetSrcData from "../../hooks/useGetSrcData";
import { List, ListItem, Snackbar } from "@material-ui/core";
import defaultUserImage from "../../assets/defaultUserImage.png";
import plate from "../../assets/plate.svg";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    img: {
      height: theme.spacing(25),
      width: theme.spacing(25),
      margin: "auto",
      borderRadius: "50%",
    },
    uploadSection: {
      height: theme.spacing(10),
      width: theme.spacing(50),
      outline: "none",
      border: "3px dotted #ccc",
      "& p": {
        color: "#999",
        textAlign: "center",
      },
    },
    fieldImg: {
      height: theme.spacing(5),
      width: theme.spacing(5),
      float: "left",
      borderRadius: "50%",
    },
  })
);

const EditPicture = ({ profile, setPictureKey }) => {
  const classes = useStyles();
  //src will come from profile context and also an addSrcData action from context
  const [src, setSrc] = useState(null);
  const [err, setErr] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const uploadImage = useUploadImage();
  const getSrcData = useGetSrcData();

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
      const res = await uploadImage(acceptedFiles[0]);
      if (res.key) {
        setPictureKey(res.key);
        const response = await getSrcData(res.key);
        if (response.srcData) setSrc(response.srcData);
        //This setSrc will eventually be connected to our ProfileContext and add srcData in there.
        else setErr(response);
      } else {
        setErr(res);
        setSnackBarOpen(true);
      }
    },
    [uploadImage, getSrcData, setPictureKey]
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
            className={classes.img}
          />
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
