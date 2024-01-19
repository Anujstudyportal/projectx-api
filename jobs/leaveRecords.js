// const leaveRecordsModel = require('../models/leaveRecordsModel');
const cron = require("node-cron");
const pathConfig = require("../config/path");

const axios = require("axios");
let cronScheduled = cron.schedule("0 0 * * *", () => {
  const urlToCall = pathConfig.BASEURL + "leaveRecords/add";

  axios
    .post(urlToCall)
    .then((response) => {
      console.log(
        `HTTP request to ${urlToCall} successful. Response: ${response.data}`
      );
    })
    .catch((error) => {
      console.error(
        `HTTP request to ${urlToCall} failed. Error: ${error.message}`
      );
      cronScheduled.stop();
    });
});
return true;
