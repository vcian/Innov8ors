import mongoose from "mongoose";
import { IBannerDoc, IBannerModel } from "./banner.interface";


const BannerSchema = new mongoose.Schema<IBannerDoc,IBannerModel>(
    {
        BannerTitle:{
            type : String,
            required : true
        },
        BannerDescription:{
            type : String,
            required : true
        },
        BannerImage:{
            type : String,
            required : true
        },
        BannerRefId:{
            type : mongoose.Schema.Types.ObjectId,
            required : true
        }
    }
)

const Banner = mongoose.model<IBannerDoc,IBannerModel>("BannerTable",BannerSchema)

export default Banner

