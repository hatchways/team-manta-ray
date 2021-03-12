import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const TestDropZone = () => {
  const [src, setSrc] = useState(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    try {
      const formData = new FormData();
      formData.append("profilePicture", acceptedFiles[0]);
      console.log("formData :" + formData);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(`/upload`, formData, config);
      const response = await axios.get(`/image/${res.data.key}`);
      setSrc(response.data.srcData);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <>
      <div {...getRootProps()} style={{ height: "200px" }}>
        <input {...getInputProps()} />
        {src && (
          <div>
            <img src={src} alt="preview" />
          </div>
        )}
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </>
  );
};

export default TestDropZone;
