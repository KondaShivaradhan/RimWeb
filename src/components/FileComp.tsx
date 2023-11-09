import React, { useEffect, useState } from "react";
interface FileCompProps {
  filePath: string;
}
const FileComp: React.FC<FileCompProps> = ({ filePath }) => {
  const [imageSrc, setImageSrc] = useState<string>(""); // State to store the image source
  // Replace with the path to the user's file

  useEffect(() => {
    // Define the URL of the Django view that serves the user's file
    const url = "http://192.168.1.8:8000/rimmind/fetchFile/";
    console.log(`here with r vaue as ${filePath}`);

    // Create a POST request to send user details to the server
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: filePath,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("File request failed");
        }
      })
      .then((fileUrl) => {
        // Update the image source with the received file URL
        setImageSrc(fileUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <img src={imageSrc} height={100} width={100} />
    </div>
  );
};

export default FileComp;
