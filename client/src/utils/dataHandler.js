import axiosInstance from "../axios";

// GET request
export const fetchData = async (endpoint) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  // POST request
  export const postData = async (endpoint, data) => {
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };
  
  // PUT request
  export const updateData = async (endpoint, data) => {
    try {
      const response = await axiosInstance.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };
  
  // DELETE request
  export const deleteData = async (endpoint) => {
    try {
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };
  