import * as express from "express";
import * as bodyParser from "body-parser";
// import { LoggingUtil } from '../utils/log4js';
import * as cookieParser from "cookie-parser";
// import rateLimit from 'express-rate-limit'
const session = require("express-session");

import * as passport from "passport";

import { Model } from "mongoose";

import * as cors from "cors";
import * as crypto from "crypto";
import helmet from "helmet";
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
import * as onFinished from "on-finished";
import router from "../routes";
import { MongoConfig } from "./MongoConfig";
import httpStatus = require("http-status");
import { ApiError, errorConverter, errorHandler } from "../modules/errors";
import { jwtStrategy } from "../modules/auth";

import { rateLimit } from "express-rate-limit";

// crypto encryption...
const key = "3ffbc17fe05fef8ed59230c9919523b1";
const iv = "08239c5fe52af5e00fa8c2aa879ef2d2";
const algorithm = "aes-256-cbc";

export class WebAppConfig {
  public static Modals: Map<string, Model<any>>;

  private static instance: WebAppConfig;
  public app:any  = null;

  constructor() {}

  public static getInstance(): WebAppConfig {
    if (WebAppConfig.instance == null) {
      WebAppConfig.instance = new WebAppConfig();
    }
    return WebAppConfig.instance;
  }

  

  public async initApp() {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP, please try again later.",
    });
    this.app = express();
    //this.app.use(helmet());
    this.app.use(cors({ origin: "*" }));

    this.app.use(limiter);

    // ==================== Properties initialization ==========
    this.app.use(express.json({ limit: "10kb" }));
    this.app.use(express.urlencoded({ limit: "10kb", extended: true }));
    this.app.use(bodyParser.urlencoded({ limit: "10kb", extended: true }));

    //  enable cors if your front end and back end resides on different server
    // this.app.use(cors({
    //   origin: '*',
    //   // origin: 'http://localhost:4200',
    //   // optionsSuccessStatus: 200,
    //   credentials: false
    // /}))

    // this.app.use(session(
    //   {
    //     secret:"dfghjkl",
    //     keys: ['some random key'],
    //     resave: false,
    //     saveUninitialized: false,
    //     cookie: {
    //         maxAge: 10000, // Used for expiration time.
    //         sameSite: 'strict', // Cookies will only be sent in a first-party context. 'lax' is default value for third-parties.
    //         httpOnly: true, //Ensures the cookie is sent only over HTTP(S)
    //         domain: process.env.Domain, //Used to compare against the domain of the server in which the URL is being requested.
    //         secure: false // Ensures the browser only sends the cookie over HTTPS. false for localhost.
    //     }
    //   }
    //   ))

    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    // https://javascript.plainenglish.io/how-to-sanitize-your-express-app-against-mongodb-injection-cross-site-scripting-6a22f4e822aa
    this.app.use(mongoSanitize());

    // this package will not allow any scriptiong in request body
    this.app.use(xss());

    this.app.use(passport.initialize());
    passport.use("jwt", jwtStrategy);
    this.app.use("/api", router);
    this.app.use((_req, _res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
    });

    // convert error to ApiError, if needed
    this.app.use(errorConverter);

    // handle error
    this.app.use(errorHandler);

    // this.app.use(AppRouter.getInstance().getRouter())

    this.app.listen(3000, () => {
      console.log("service started on 3000");
    });

    await this.initDB();
  }

  public async initDB() {
    await MongoConfig.DBConnection();
    console.log("db connected successfully...");

    // WebAppConfig.Modals = new Map<string, Model<any>>();
    // WebAppConfig.Modals.set(Collection.UserCollections, UserModel.GetModal())
    // WebAppConfig.Modals.set(Collection.QrCollections, QrModel.GetModal())
    // WebAppConfig.Modals.set(Collection.CouponCodeCollections, CouponCodeModel.GetModal())
    // WebAppConfig.Modals.set(Collection.OrderCollections, OrderModel.GetModal())
    // WebAppConfig.Modals.set(Collection.ProductCollections, ProductModel.GetModal())
    // WebAppConfig.Modals.set(Collection.QuotationCollections, QuotationModel.GetModal())
    // WebAppConfig.Modals.set(Collection.RefCodeCollections, ReferenceCodeModel.GetModal())
    // WebAppConfig.Modals.set(Collection.UserDetailsCollections, UserDetailsModel.GetModal())
    // WebAppConfig.Modals.set(Collection.LocationCollections, LocationModel.GetModal())
    // WebAppConfig.Modals.set(Collection.ProductReviewCollections, ProductReviewModel.GetModal())
    // WebAppConfig.Modals.set(Collection.ProductCategoryCollections, ProductCategoryModel.GetModal())

    // set external app cinfiguration
    // const extApp = await ApiService.getInstance().getConfig()
    // const ExtAppConfig = new ExternalAppConfig(extApp);
    // await ExtAppConfig.init();
  }
}
