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
const mongoose_1 = require("mongoose");
const arrayValidator = function (value) {
    return value.length !== 0;
};
const TestSchema = new mongoose_1.default.Schema({
    TestName: {
        type: String,
        enum: {
            values: ["Test", "Test01", "Test02"],
            message: "{value} is not supported"
        },
        required: [true, "Testname is require"]
    },
    TestTitle: {
        type: String,
        required: true
    },
    TestDescription: {
        type: String,
        required: true,
        max: 100,
        min: 10
    },
    TestNo: {
        type: Number,
        required: function () {
            return this.TestName == "Test";
        },
        min: 10,
        max: 100
    },
    SubTest: [
        {
            TestAddressId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: Location,
                required: true
            },
            TestLocation: {
                type: String,
                required: true
            },
            TestPrice: {
                type: Number,
                validate: {
                    validator: function (v) {
                        return v > 100;
                    },
                    message: function (props) {
                        return `${props.value} is not supported`;
                    }
                }
            },
        }
    ],
    TestAddress: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: Location,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
TestSchema.virtual("AddressInfo", {
    ref: "LocationTable",
    localField: "SubTest.TestAddressId",
    foreignField: "_id",
    justOne: false
});
TestSchema.path("SubTest").validate(function (value) {
    return value.length !== 0;
}, "atleast one doc is require");
TestSchema.virtual("info").get(function () {
    return this.TestTitle + " : " + this.TestDescription;
});
TestSchema.static("bytitle", function (title) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(":::::");
        const data = yield this.find({ 'TestTitle': { $regex: `${title}` } });
        console.log("data::: ", data);
        return data;
    });
});
TestSchema.method("checktestno", function () {
    return this.TestNo > 50;
});
const TestModel = mongoose_1.default.model('TestTable', TestSchema);
exports.default = TestModel;
//# sourceMappingURL=test.model.js.map