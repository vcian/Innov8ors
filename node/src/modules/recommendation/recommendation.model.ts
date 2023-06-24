// import mongoose from 'mongoose';

// import {hash,compare} from "bcrypt"
// import { AuthStrategy, DurationType, KnowledgeLevelType, LearnigPaceTypes, LearningStyleTypes, TimePreferenceType, UserType } from '../utils/enum';
// import {Collections} from "../utils/enum"
// import { toJSON } from '../toJSON';
// import { EnvironmentConfig } from '../../config/EnvironmentConfig';
// import { ApiError } from '../errors';
// import httpStatus = require('http-status');
// import { User } from '../user';
// import { IRecommendationDoc, IRecommendationModel } from './recommendation.interfaces';


// const RecommendationSchema = new mongoose.Schema<IRecommendationDoc, IRecommendationModel>(
//   {
   
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );


// RecommendationSchema.plugin(toJSON)


// const Recommendation = mongoose.model<IRecommendationDoc, IRecommendationModel>(Collections.RecommendationCollections, RecommendationSchema);

// export default Recommendation;
