import { number } from "joi";
import mongoose from "mongoose";
import { ITestDoc, ITestModel } from "./test.interface";



const arrayValidator = function(value){
    return value.length !== 0 
}

const TestSchema = new mongoose.Schema<ITestDoc,ITestModel>(
    {
        TestName:{
            type:String,
            enum:{
                values:["Test","Test01","Test02"],
                message:"{value} is not supported"
            },
            required:[true,"Testname is require"]
        },
        TestTitle:{
            type:String,
            required:true
        },
        TestDescription:{
            type:String,
            required:true,
            max:100,
            min:10
        },
        TestNo:{
            type:Number,
            required:function(){
                return this.TestName == "Test"
            },
            min:10,
            max:100
        },
        SubTest:[
            {
                TestAddressId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:Location,
                    required:true
                },
                TestLocation:{
                    type:String,
                    required:true
                },
                TestPrice:{
                    type:Number,
                    validate:{
                        validator:function(v){
                            return v>100
                        },
                        message: function (props){
                            return `${props.value} is not supported`
                        }
                    }
                },
            }
        ],
        TestAddress:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Location,
            required:true
        }
        
    },
    {
        timestamps:true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }    
    }
) 

TestSchema.virtual("AddressInfo",{
    ref:"LocationTable",
    localField:"SubTest.TestAddressId",
    foreignField:"_id",
    justOne:false
})

TestSchema.path("SubTest").validate(function(value){
    return value.length !== 0 
},"atleast one doc is require")



TestSchema.virtual("info").get(function(){
    return this.TestTitle +" : "+ this.TestDescription
})

TestSchema.static("bytitle",async function(title:string):Promise<ITestDoc[]>{
    console.log(":::::")
    const data = await this.find({'TestTitle':{$regex:`${title}`}})
    console.log("data::: ",data)
    return data
})

TestSchema.method("checktestno",function():boolean{
    return this.TestNo > 50
})

const TestModel = mongoose.model<ITestDoc,ITestModel>('TestTable',TestSchema)

export default TestModel


