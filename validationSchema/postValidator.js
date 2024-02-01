const Joi = require('joi');

const postSchema = Joi.object({
  post_title: Joi.string().required(),
  post_summary: Joi.string().required(),
  tags: Joi.array().items(Joi.string().required()),
}).unknown();

module.exports = postSchema;