const CryptoJS = require("crypto-js");
const secretKey = "dnasnfasdmasmdlmasdlmasldms";

const cryptHelper = {
  encrypt: async (data) => {
    if (typeof data == "string") {
      return CryptoJS.AES.encrypt(data, secretKey).toString();
    } else {
      return false;
    }
  },
  decrypt: async (data) => {
    if (typeof data == "string") {
      return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
    } else {
      return false;
    }
  },
  createHash: async (data) => {
    return CryptoJS.MD5(
      CryptoJS.enc.Utf8.parse(
        CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(data.id)) +
          "-" +
          CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(data.email))
      )
    ).toString(CryptoJS.enc.Hex);
  },
};

module.exports = cryptHelper;
