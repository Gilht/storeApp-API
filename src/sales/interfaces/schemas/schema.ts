import joi from "joi";

export const saleSchemas = {
  INSERT: {
    body: joi.object({
      user: joi.string().required().messages({
        "string.base": "User ID must be a string",
        "any.required": "User ID is required",
      }),
      saleNumber: joi.string().min(1).max(100).required().messages({
        "string.base": "Sale number must be a string",
        "string.max": "Sale number must not exceed 100 characters",
        "any.required": "Sale number is required",
      }),
      discount: joi.number().min(0).optional().default(0).messages({
        "number.base": "Discount must be a number",
        "number.min": "Discount must be at least 0",
      }),
      details: joi
        .array()
        .items(
          joi.object({
            product: joi.number().integer().positive().required().messages({
              "number.base": "Product ID must be a number",
              "number.integer": "Product ID must be an integer",
              "number.positive": "Product ID must be positive",
              "any.required": "Product ID is required",
            }),
            quantity: joi.number().integer().positive().required().messages({
              "number.base": "Quantity must be a number",
              "number.integer": "Quantity must be an integer",
              "number.positive": "Quantity must be greater than 0",
              "any.required": "Quantity is required",
            }),
            unitPrice: joi.number().positive().required().messages({
              "number.base": "Unit price must be a number",
              "number.positive": "Unit price must be greater than 0",
              "any.required": "Unit price is required",
            }),
          })
        )
        .min(1)
        .required()
        .messages({
          "array.base": "Details must be an array",
          "array.min": "Sale must have at least one detail",
          "any.required": "Details are required",
        }),
    }),
  },
  UPDATE: {
    body: joi.object({
      saleNumber: joi.string().min(1).max(100).required().messages({
        "string.base": "Sale number must be a string",
        "string.max": "Sale number must not exceed 100 characters",
        "any.required": "Sale number is required",
      }),
      discount: joi.number().min(0).optional().default(0).messages({
        "number.base": "Discount must be a number",
        "number.min": "Discount must be at least 0",
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
