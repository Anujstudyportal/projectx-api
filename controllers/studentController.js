const leadModel = require("../models/leadModel");
const studentModel = require("../models/studentModel");
const { errorHandler, pagination } = require("../helpers/customHelper");
const studentController = {
  addStudent: async (req, res, next) => {
    let postData = req.body;
    try {    
     // const student = await leadModel.create(postData);

     // const student = await studentModel.create(postData);

     // res.status(201).send(result);
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
};

module.exports = studentController;