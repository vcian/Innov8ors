import { MongoClient, Db } from 'mongodb';
import mongoose from "mongoose"
var util = require('util')

export class MongoConfig{
    private static primaryurl="mongodb://0.0.0.0:27017/Bolierplat";
    public static async DBConnection() {
        try{
            mongoose.connect(MongoConfig.primaryurl)
        }catch(error){
                console.log(`Fetching records failed!`)
                console.log(error)
                return error
            }            
        }
    }