import mongoose,{Document,Model} from "mongoose"

export interface ISubTest{
    TestAddressId:mongoose.ObjectId
    TestLocation:string
    TestPrice:number
}

export interface ITest {
    TestName:string
    TestTitle:string
    TestNo:number
    TestDescription:string
    SubTest : Array<ISubTest>
    TestAddress:mongoose.ObjectId
}

export interface ITestDoc extends ITest,Document{
    checktestno():Promise<boolean>
}

export interface ITestModel extends Model<ITestDoc>{
    bytitle(title:string) : Promise<ITestDoc[]>
}

