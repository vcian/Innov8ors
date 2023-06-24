import mongoose from 'mongoose';
import tokenTypes from './token.types';
import { ITokenDoc, ITokenModel } from './token.interfaces';
import { Collections} from "../utils/enum"
const tokenSchema = new mongoose.Schema<ITokenDoc, ITokenModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const Token = mongoose.model<ITokenDoc, ITokenModel>(Collections.TokenCollections, tokenSchema);

export default Token;
