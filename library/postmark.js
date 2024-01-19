const postmark = require("postmark");
require("dotenv").config({ path: ".env" });
const fs = require("fs");
const path = require("path");
const client = new postmark.ServerClient(process.env.POSTMARK_KEY);

const postmarkObj = {
  sendEmail: async (
    to,
    subject,
    template = "studentVerification",
    variables = []
  ) => {
    try {
      const templateFilePath = path.join(
        __dirname,
        "..",
        "templates/email/" + template + ".html"
      ); // Update with the correct file path
      let htmlBody = fs.readFileSync(templateFilePath, "utf-8");

      if (variables.length > 0) {
        variables.forEach((v) => {
          htmlBody = htmlBody.replace(new RegExp(v.label, "g"), v.value);
        });
      }

      const response = await client.sendEmail({
        From: process.env.POSTMARK_FROM_EMAIL,
        To: to,
        Subject: subject,
        HtmlBody: htmlBody,
      });

      return response;
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  },
};

module.exports = postmarkObj;
