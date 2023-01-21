const joi= require('joi')

const signUpSchema =  joi.object({
    full_name : joi.string().trim().required().pattern(new RegExp("^^[A-Za-z ]+$")).prefs({"messages":{"string.pattern.base": "User Name pattern is Incorrect.","any.required": "User Name is required."}}),
    number: joi.string().max(15).prefs({"messages":{"string.pattern.base": "Invalid Number.","string.max":"Backup Number should have maximum 13 characters"}}),
});
const signInSchema =  joi.object({
    number: joi.string().max(15).pattern(new RegExp("^(\\+92)(3)([0-9]{2})([0-9]{7})$")).prefs({"messages":{"string.pattern.base": "Invalid Backup Number.","string.max":"Backup Number should have maximum 13 characters"}}),
});

module.exports = {
signUpSchema,
signInSchema
}