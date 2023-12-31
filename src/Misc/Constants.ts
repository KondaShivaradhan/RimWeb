import CryptoJS from "crypto-js";
export const urls = {
    devNode: "https://node.blazingbane.com",
    add: "https://node.blazingbane.com/rim/add",
    edit: "https://node.blazingbane.com/rim/",
    fetchRecords: "https://node.blazingbane.com/rim",
    delRecord: "https://node.blazingbane.com/rim"
  }
  export const urls2 = {
    devNode: "http://192.168.1.10:3003",
    add: "http://192.168.1.10:3003/rim/add",
    edit: "http://192.168.1.10:3003/rim/",
    fetchRecords: "http://192.168.1.10:3003/rim",
    delRecord: "http://192.168.1.10:3003/rim"
  }
  export const classicDarkTheme = {
    background: "#1E1E1E",
    text: "#FFFFFF",
    accent: "#3498DB",
  };
  export const colortemp = [
    "#0D1B2A",
    "#1B263B",
    "#415A77",
    "#778DA9",
    "#E0E1DD"
  ]
  

  export const Encrypt = (text: string, email: string): string => {
    let ciphertext = CryptoJS.AES.encrypt(text, email).toString()
    return ciphertext
  }

  export const Decrypt = (ciphertext: string, email: string): string => {
    let bytes = CryptoJS.AES.decrypt(ciphertext, email);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  }
