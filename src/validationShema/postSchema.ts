import joi from "joi";

export const postSchema = joi.object({
  content: joi.string().required(),
  image: joi.any(),
});
