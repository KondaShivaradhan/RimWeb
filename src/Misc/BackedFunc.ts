import axios from "axios";
import { urls } from "./Constants";
import { log } from "console";
export const initUser = async (user: any) => {
    try {
      const response = await axios.post(
        urls.edit,
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
      console.error("Error in sendingStuff email:", error);
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
    const newArray: string[] = TagArray.map((item: string) => {
      return item.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    });
    console.log(TagArray);
    console.log(newArray);
    console.log(values.media);
    let output = {
      user: user?.email,
      title: values.title,
      TagArray: newArray,
      desp: values.description,
    };
    
    try {
     
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.post(`${urls.add}`, output, config);
      console.log(response.data);
      return response.data;
 
    } catch (error) {
      console.log(`error at function handleFromsubmit at backend function ${error}`);
    }

    console.log("Form submitted with values:", output);
  };
 

  export const DeleteThis = async (values: any) => {
    try {
      const response = await axios.delete(`${urls.delRecord}/?id=${values.id as number}`)
      
      return response.data.message;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };