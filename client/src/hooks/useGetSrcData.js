import axios from "axios";

const useGetSrcData = () => {
  const getSrcData = async (key) => {
    try {
      const response = await axios.get(`/api/image/${key}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      return "Something went wrong";
    }
  };

  return getSrcData;
};

export default useGetSrcData;
