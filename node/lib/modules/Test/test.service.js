"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTest = exports.getTest = void 0;
const test_model_1 = require("./test.model");
const mongoose_1 = require("mongoose");
const getTest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const AuthorSchema = new mongoose_1.default.Schema({
        name: String
    }, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });
    const BlogPostSchema = new mongoose_1.default.Schema({
        title: String,
        author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Author' },
        comments: [{
                author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Author' },
                content: String
            }]
    });
    const BlogPost = mongoose_1.default.model('BlogPost', BlogPostSchema, 'BlogPost');
    AuthorSchema.virtual("post", {
        ref: "BlogPost",
        localField: "_id",
        foreignField: "author",
        // match: { title: "Test02" } // match option with basic query selector
        // count:true
    });
    const Author = mongoose_1.default.model('Author', AuthorSchema, 'Author');
    return yield Author.findOne().populate({ path: 'post', select: "-_id",
        //   transform:function(doc){
        //     return {title:doc.title}
        //   }
    });
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
});
exports.getTest = getTest;
const setTest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return test_model_1.default.create(data);
});
exports.setTest = setTest;
//# sourceMappingURL=test.service.js.map