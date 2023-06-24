import { ObjectId } from "mongodb";
import { ITest, ITestDoc } from "./test.interface";
import TestModel from "./test.model";
import mongoose from "mongoose";

export const getTest = async (data:any): Promise<any> => {

    const AuthorSchema = new mongoose.Schema({
        name: String
      },
      {
        toJSON: { virtuals: true },
        toObject: { virtuals: true } 
      });

      
      const BlogPostSchema = new mongoose.Schema({
        title: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
        comments: [{
          author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
          content: String
        }]
      });

      const BlogPost = mongoose.model('BlogPost', BlogPostSchema, 'BlogPost');

    
      AuthorSchema.virtual("post",{
        ref:"BlogPost",
        localField:"_id",
        foreignField:"author",
        // match: { title: "Test02" } // match option with basic query selector
        // count:true
    })
      const Author = mongoose.model('Author', AuthorSchema, 'Author');

      return await Author.findOne().populate({path:'post',select:"-_id",
    //   transform:function(doc){
    //     return {title:doc.title}
    //   }
    })

    //   return await Author.insertMany([{"name":"pratik"},{"name":"chirag"},{"name":"nidhi"}])
    //   return await BlogPost.insertMany([{"title":"Test01","author":"64671a9cbc69ede6643f9a32",comments:[{"author":"64671a9cbc69ede6643f9a32","content":"Test comment01"},{"author":"64671a9cbc69ede6643f9a33","content":"Test comment02"}]},{"title":"Test02","author":"64671a9cbc69ede6643f9a33",comments:[{"author":"64671a9cbc69ede6643f9a33","content":"Test comment011"},{"author":"64671a9cbc69ede6643f9a34","content":"Test comment022"},{"author":"64671a9cbc69ede6643f9a34","content":"Test comment033"}]}])


    // const title = data.title
    // TestModel.find().select("TestNo").sort("-TestNo").exec((err,data)=>{
    //     console.log(data)
    // })
    // console.log("::::::::::::::")
    // return await TestModel.find().select("TestNo").sort("-TestNo")

    
    // const query = TestModel.find({"TestNo":data.TestNo})

    // query.exec((err,val)=>console.log("::::::",val))
    // console.log("---------")
    // return await TestModel.find().populate(["SubTest.TestAddressId","TestAddress"]).sort("-createdAt")
    // console.log(query.getOptions())
    // console.log(query.getFilter())
    // console.log(query.getPopulatedPaths())
    // console.log(query.getQuery())
    // console.log((await query).$getAllSubdocs())
    // return await TestModel.aggregate([{$match:{"_id":new ObjectId(data.id)}}])

    // const TestData = await TestModel.bytitle(title)
    // const _data = TestData.filter((obj)=>obj.checktestno())
    // return _data;
};

export const setTest = async (data:ITest): Promise<ITestDoc|null> => {
    return TestModel.create(data);
};

