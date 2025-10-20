import joi from "joi";

export const productSchemas = {
  INSERT: {
    body: joi.object({
      name: joi.string().min(3).max(200).required().messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 200 characters",
        "any.required": "Name is required",
      }),
      code: joi.string().min(1).max(100).required().messages({
        "string.base": "Code must be a string",
        "string.max": "Code must not exceed 100 characters",
        "any.required": "Code is required",
      }),
      description: joi.string().allow("").optional().messages({
        "string.base": "Description must be a string",
      }),
      price: joi.number().positive().required().messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be greater than 0",
        "any.required": "Price is required",
      }),
      salePrice: joi.number().positive().optional().allow(null).messages({
        "number.base": "Sale price must be a number",
        "number.positive": "Sale price must be greater than 0",
      }),
      category: joi.number().integer().positive().required().messages({
        "number.base": "Category ID must be a number",
        "number.integer": "Category ID must be an integer",
        "number.positive": "Category ID must be positive",
        "any.required": "Category ID is required",
      }),
      brand: joi.number().integer().positive().required().messages({
        "number.base": "Brand ID must be a number",
        "number.integer": "Brand ID must be an integer",
        "number.positive": "Brand ID must be positive",
        "any.required": "Brand ID is required",
      }),
    }),
  },
  UPDATE: {
    body: joi.object({
      name: joi.string().min(3).max(200).required().messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 200 characters",
        "any.required": "Name is required",
      }),
      code: joi.string().min(1).max(100).required().messages({
        "string.base": "Code must be a string",
        "string.max": "Code must not exceed 100 characters",
        "any.required": "Code is required",
      }),
      description: joi.string().allow("").optional().messages({
        "string.base": "Description must be a string",
      }),
      price: joi.number().positive().required().messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be greater than 0",
        "any.required": "Price is required",
      }),
      salePrice: joi.number().positive().optional().allow(null).messages({
        "number.base": "Sale price must be a number",
        "number.positive": "Sale price must be greater than 0",
      }),
      categoryId: joi.number().integer().positive().required().messages({
        "number.base": "Category ID must be a number",
        "number.integer": "Category ID must be an integer",
        "number.positive": "Category ID must be positive",
        "any.required": "Category ID is required",
      }),
      brandId: joi.number().integer().positive().required().messages({
        "number.base": "Brand ID must be a number",
        "number.integer": "Brand ID must be an integer",
        "number.positive": "Brand ID must be positive",
        "any.required": "Brand ID is required",
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
