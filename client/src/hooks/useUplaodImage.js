import axios from "axios";

const useUploadImage = () => {
  const uplaodImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(`/upload`, formData, config);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      return "Something went wrong";
    }
  };

  return uplaodImage;
};

export default useUploadImage;
