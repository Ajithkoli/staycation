const joi=require('joi');

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