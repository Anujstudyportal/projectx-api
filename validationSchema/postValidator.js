const Joi = require('joi');

const postSchema = Joi.object({
  post_title: Joi.string().required(),
  post_summary: Joi.string().required(),
  post_url: Joi.string().required(),
  post_type_id: Joi.number().integer().required(),
  post_module_type: Joi.string().required(),
  post_module_id: Joi.number().integer().required(),
  post_category_id: Joi.number().integer().required(),
  post_status: Joi.required(),
  user_id: Joi.number().integer().required(),
  user_type: Joi.required(),
  clicks: Joi.required(),
  published_at: Joi.date().default(Date.now),
  till_date: Joi.date().default(Date.now),
  tags: Joi.array().items(Joi.required()),
}).unknown();

module.exports = postSchema;