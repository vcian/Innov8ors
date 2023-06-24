import * as Joi from "joi"
import { objectId } from "../validate"
import { IBanner } from "./banner.interface"

const CreateBanner : Record<keyof IBanner,any> = {
    BannerTitle:Joi.string().required().min(10).max(20),
    BannerDescription:Joi.string().required().min(20).max(100),
    BannerImage:Joi.string().required(),
    BannerRefId:Joi.string().custom(objectId)
}

export const CreateBannerSchema = {
    body:Joi.object().keys(CreateBanner)
}

