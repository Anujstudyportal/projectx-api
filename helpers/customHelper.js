const moment = require("moment");
const customHelper = {
  errorHandler: async (e) => {
    if (e.name == "ValidationError") {
      e.errors = e.details;
    }

    if (Array.isArray(e.errors)) {
      const errors = e.errors.map((item) => {
        return { [item.path]: item.message.replace(/"/g, "") };
      });
      return errors;
    } else if (typeof e === "object" && e !== null) {
      if (e.name == "SequelizeDatabaseError") {
        return [{ dberror: e.message }];
      }
      return [{ message: e.message }];
    } else {
      return e;
    }
  },
  pagination: async (data) => {
    const result = {};

    result.page = isFinite(data.page) ? data.page : 1;
    result.limit = isFinite(data.per_page) ? data.per_page : 15;
    result.offset = (result.page - 1) * result.limit;
    return result;
  },
  timezone: (timestamp = null) => {
    const expMilliseconds = timestamp != null ? timestamp * 1000 : Date.now();
    const expDate = new Date(expMilliseconds);

    // Format the date in the desired format
    const formattedDate = expDate.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    });

    const parsedDate = moment(formattedDate, "DD/MM/YYYY, hh:mm:ss a");
    const formattedDate1 = parsedDate.format("YYYY-MM-DD HH:mm:ss");

    return formattedDate1;
  },
  checkTokenFormat: async (header) => {
    const authHeader = header;
    if (typeof authHeader == "undefined") {
      return res.status(401).send({
        message: "Authorization header missing",
        status: 401,
      });
    }
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).send({
        message: "Invalid Authorization header format",
        status: 401,
      });
    }

    return tokenParts[1];
  },
  generateOTP: async () => {
    const otp = Math.floor(100000 + Math.random() * 900000);

    return otp.toString();
  },
};

module.exports = customHelper;
