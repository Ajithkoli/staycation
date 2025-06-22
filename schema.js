const Joi = require('joi');
const joi=require('joi');

// this is the server side validation
// create a joi schema then create a middleware and pass that middle middle in the api routes function
//schema validation using joi- use it where we want to throw proper error if schema is not met
module.exports.ListingSchema=joi.object({
    listing: joi.object(
       { title:joi.string().required(),
         description:joi.string().required(),
         location:joi.string().required(),
         country:joi.string().required(),
         price:joi.number().required().min(0),
        image:joi.string().allow("",null)
   } ).required()
})

module.exports.reviewSchema=Joi.object({
   review:Joi.object({
      rating:Joi.number().required().min(1).max(5),
      comment:Joi.string().required()

   }).required()
})