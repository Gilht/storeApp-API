import joi from "joi";

export const categorySchemas = {
  INSERT: {
    body: joi.object({
      name: joi.string().min(3).max(100).required().messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 100 characters",
        "any.required": "Name is required",
      }),
    }),
  },
  UPDATE: {
    body: joi.object({
      name: joi.string().min(3).max(100).required().messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 100 characters",
        "any.required": "Name is required",
      }),
    }),
    params: joi.object({
      id: joi.number().integer().positive().required().messages({
        "number.base": "ID must be a number",
        "number.integer": "ID must be an integer",
        "number.positive": "ID must be positive",
        "any.required": "ID is required",
      }),
    }),
  },
};
