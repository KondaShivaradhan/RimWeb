import axios from "axios";
import { urls } from "./Constants";
import { log } from "console";
const backendserver = "https://platypus-bold-sturgeon.ngrok-free.app/rimmind/"
export const initUser = async (user: any) => {
    try {
      const response = await axios.post(
        backendserver,
        user
      );
      return response.data.message;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
};

export const sendStuff = async (stuff: any) => {
  console.log(stuff);
    try {
      const response = await axios.post(`${urls.add}`, stuff);
      return response.data.message;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
};
export const fetchcomplete = async (stuff: any) => {
    try {
     
      const recordsResponse = await axios.get(`${urls.fetchRecords}?email=${stuff.email}`);
      return recordsResponse.data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
};
export const handleFormSubmit = async (user:any,values: any) => {
    // split the tags string to array of strings,
    const TagArray = values.tags.split(",");
    console.log(TagArray);
    console.log(values.media);
    let output = {
      user: user?.email,
      title: values.title,
      TagArray: TagArray,
      desp: values.description,
      media: values.media
    };
    let formData = new FormData()
    formData.append("user",user?.email)
    formData.append("title",values.title)
    formData.append("TagArray",TagArray)
    formData.append("desp",values.description)
    formData.append("media",values.media)
    try {
      const response = await axios.post(`${urls.add}`, formData);
      console.log(response.data);
      return response.data;
      
      // await sendStuff(formData)
      //   .then((message: string) => {
      //     console.log(message);
      //   })
      //   .catch((error: any) => {
      //     console.error(error);
      //   });
    } catch (error) {}

    console.log("Form submitted with values:", output);
  };
  export const DeleteThis = async (values: any) => {
    try {
      const response = await axios.post(
        `${backendserver}delete/`,
        values
      );
      return response.data.message;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };