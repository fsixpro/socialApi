import joi from "joi";

export const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
