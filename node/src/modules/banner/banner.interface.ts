import { ObjectId,Document, Model } from "mongoose"

export interface IBanner{
    BannerTitle : string
    BannerDescription : string
    BannerImage : string
    BannerRefId : ObjectId
}

export interface IBannerDoc extends IBanner,Document{}

export interface IBannerModel extends Model<IBannerDoc>{}
