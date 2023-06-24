
import mongoose from "mongoose"
import { AuthTypes } from "../utils/enum"
import { IAuth,IAuthDoc,IAuthModel } from "./auth.interface"

const AuthSchema = new mongoose.Schema<IAuthDoc,IAuthModel>({
    authType:{
        type:String,
        required:true,
        enum: [AuthTypes.Email,AuthTypes.Mobile],
    },
    authValue:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    expirOn:{
        type:Date,
        required:true
    },
    varified:{
        type:Boolean,
        required:true,
        default:false
    }
},
{
    timestamps:true
})

AuthSchema.static("isEmailVarified",async function(value:string):Promise<boolean> {
    const AuthObj = await this.findOne({authValue:value})
    if(!AuthObj){
        return false
    }
    return AuthObj.varified
})

const AuthModel =  mongoose.model<IAuthDoc, IAuthModel>("AuthTable",AuthSchema)

export default AuthModel


