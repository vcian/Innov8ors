import * as Joi from "joi";
import { ITest } from "./test.interface";

const ObjectId = (value:string,helpers:Joi.CustomHelpers) => {
    if(!value.match(/^[0-9a-fA-F]+$/)){
        return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' });
    }
    return value;
}

const CreateTest : Record<keyof ITest,any> = {
    TestName:Joi.string().required(),
    TestDescription:Joi.string().required(),
    TestNo:Joi.number().required().max(10).min(1),
    TestTitle:Joi.string().required(),
    SubTest:Joi.array().items(Joi.object({
        TestAddressId:Joi.string().custom(ObjectId).required(),
        TestLocation:Joi.string().required(),
        TestPrice:Joi.number().required().max(999).min(10)
    })),
    TestAddress:Joi.string()
}

