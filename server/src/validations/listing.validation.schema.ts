import joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

export const createListingSchema = {
  body: joi
    .object()
    .keys({
      title: joi.string().required(),
      startPrice: joi.number().required(),
      maxPrice: joi.number().required(),
      categoryId: joi.string().required(),
      listingsImage: joi.any()
    })
    .required(),
};
