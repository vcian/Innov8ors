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
exports.WebAppConfig = void 0;
const express = require("express");
const bodyParser = require("body-parser");
// import { LoggingUtil } from '../utils/log4js';
const cookieParser = require("cookie-parser");
// import rateLimit from 'express-rate-limit'
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const routes_1 = require("../routes");
const MongoConfig_1 = require("./MongoConfig");
const httpStatus = require("http-status");
const errors_1 = require("../modules/errors");
const auth_1 = require("../modules/auth");
const express_rate_limit_1 = require("express-rate-limit");
// crypto encryption...
const key = "3ffbc17fe05fef8ed59230c9919523b1";
const iv = "08239c5fe52af5e00fa8c2aa879ef2d2";
const algorithm = "aes-256-cbc";
class WebAppConfig {
    constructor() {
        this.app = null;
    }
    static getInstance() {
        if (WebAppConfig.instance == null) {
            WebAppConfig.instance = new WebAppConfig();
        }
        return WebAppConfig.instance;
    }
    initApp() {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = (0, express_rate_limit_1.rateLimit)({
                windowMs: 15 * 60 * 1000,
                max: 100,
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
            passport.use("jwt", auth_1.jwtStrategy);
            this.app.use("/api", routes_1.default);
            this.app.use((_req, _res, next) => {
                next(new errors_1.ApiError(httpStatus.NOT_FOUND, "Not found"));
            });
            // convert error to ApiError, if needed
            this.app.use(errors_1.errorConverter);
            // handle error
            this.app.use(errors_1.errorHandler);
            // this.app.use(AppRouter.getInstance().getRouter())
            this.app.listen(3000, () => {
                console.log("service started on 3000");
            });
            yield this.initDB();
        });
    }
    initDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield MongoConfig_1.MongoConfig.DBConnection();
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
        });
    }
}
exports.WebAppConfig = WebAppConfig;
//# sourceMappingURL=WebAppConfig.js.map