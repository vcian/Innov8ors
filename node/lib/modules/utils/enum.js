"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotes = exports.QrCollections = exports.UserCollections = exports.CouponCodeCollections = exports.ProductReviewCollections = exports.ProductCollections = exports.QuotationCollections = exports.RefCodeCollections = exports.OrderCollections = exports.LocationCollections = exports.ProductCategoryCollections = exports.UserDetailsCollections = exports.UserType = exports.Collections = exports.AuthStrategy = exports.LearningStyleTypes = exports.LearnigPaceTypes = exports.TimePreferenceType = exports.DurationType = exports.KnowledgeLevelType = exports.AuthTypes = exports.StatusType = void 0;
var StatusType;
(function (StatusType) {
    StatusType["Pending"] = "pending";
    StatusType["New"] = "new";
    StatusType["Approved"] = "approved";
})(StatusType = exports.StatusType || (exports.StatusType = {}));
var AuthTypes;
(function (AuthTypes) {
    AuthTypes["Email"] = "email";
    AuthTypes["Mobile"] = "mobile";
})(AuthTypes = exports.AuthTypes || (exports.AuthTypes = {}));
var KnowledgeLevelType;
(function (KnowledgeLevelType) {
    KnowledgeLevelType["Begginer"] = "beginner";
    KnowledgeLevelType["Intermediate"] = "intermediate";
    KnowledgeLevelType["Expert"] = "expert";
})(KnowledgeLevelType = exports.KnowledgeLevelType || (exports.KnowledgeLevelType = {}));
var DurationType;
(function (DurationType) {
    DurationType["Months"] = "months";
    DurationType["Days"] = "days";
    DurationType["Weeks"] = "weeks";
})(DurationType = exports.DurationType || (exports.DurationType = {}));
var TimePreferenceType;
(function (TimePreferenceType) {
    TimePreferenceType["Morning"] = "morning";
    TimePreferenceType["Noon"] = "noon";
    TimePreferenceType["Night"] = "night";
})(TimePreferenceType = exports.TimePreferenceType || (exports.TimePreferenceType = {}));
var LearnigPaceTypes;
(function (LearnigPaceTypes) {
    LearnigPaceTypes["Slow"] = "slow";
    LearnigPaceTypes["Average"] = "average";
    LearnigPaceTypes["Fast"] = "fast";
})(LearnigPaceTypes = exports.LearnigPaceTypes || (exports.LearnigPaceTypes = {}));
var LearningStyleTypes;
(function (LearningStyleTypes) {
    LearningStyleTypes["Visual"] = "visual";
    LearningStyleTypes["Auditory"] = "auditory";
    LearningStyleTypes["Reading_Writing"] = "reading_writing";
    LearningStyleTypes["Kinesthetic"] = "kinesthetic";
})(LearningStyleTypes = exports.LearningStyleTypes || (exports.LearningStyleTypes = {}));
var AuthStrategy;
(function (AuthStrategy) {
    AuthStrategy["PassBased"] = "passBased";
    AuthStrategy["OtpBased"] = "otpBased";
})(AuthStrategy = exports.AuthStrategy || (exports.AuthStrategy = {}));
var Collections;
(function (Collections) {
    Collections["UserDetailsCollections"] = "userdetailscollections";
    Collections["UserCollections"] = "usercollections";
    Collections["ScheduleCollections"] = "ScheduleCollections";
    Collections["QrCollections"] = "qrcollections";
    Collections["CouponCodeCollections"] = "couponcodecollections";
    Collections["ProductCollections"] = "productcollections";
    Collections["QuotationCollections"] = "quotationcollections";
    Collections["RefCodeCollections"] = "refCodecollections";
    Collections["OrderCollections"] = "ordercollections";
    Collections["LocationCollections"] = "locationcollections";
    Collections["ProductCategoryCollections"] = "productcategorycollections";
    Collections["ProductReviewCollections"] = "ProductReviewCollections";
    Collections["TokenCollections"] = "TokenCollections";
    Collections["FormCollections"] = "FormCollections";
    Collections["RecommendationCollections"] = "recommendationCollections";
})(Collections = exports.Collections || (exports.Collections = {}));
var UserType;
(function (UserType) {
    UserType["User"] = "User";
    UserType["Admin"] = "Admin";
})(UserType = exports.UserType || (exports.UserType = {}));
// column names Modelwise
var UserDetailsCollections;
(function (UserDetailsCollections) {
    UserDetailsCollections["user_id"] = "user_id";
    UserDetailsCollections["user_first_name"] = "user_first_name";
    UserDetailsCollections["user_last_name"] = "user_last_name";
    UserDetailsCollections["user_phone"] = "user_phone";
    UserDetailsCollections["user_contry"] = "user_contry";
    UserDetailsCollections["user_state"] = "user_state";
    UserDetailsCollections["user_city"] = "user_city";
    UserDetailsCollections["user_pincode"] = "user_pincode";
    UserDetailsCollections["user_landmark"] = "user_landmark";
    UserDetailsCollections["user_location"] = "user_location";
    UserDetailsCollections["type"] = "type";
    UserDetailsCollections["coordinates"] = "coordinates";
})(UserDetailsCollections = exports.UserDetailsCollections || (exports.UserDetailsCollections = {}));
var ProductCategoryCollections;
(function (ProductCategoryCollections) {
    ProductCategoryCollections["product_category"] = "product_category";
    ProductCategoryCollections["product_category_location"] = "product_category_location";
})(ProductCategoryCollections = exports.ProductCategoryCollections || (exports.ProductCategoryCollections = {}));
var LocationCollections;
(function (LocationCollections) {
    LocationCollections["location_contry"] = "location_contry";
    LocationCollections["location_state"] = "location_state";
})(LocationCollections = exports.LocationCollections || (exports.LocationCollections = {}));
var OrderCollections;
(function (OrderCollections) {
    OrderCollections["order_by"] = "order_by";
    OrderCollections["order_user_detail"] = "order_user_detail";
    OrderCollections["order_product"] = "order_product";
    OrderCollections["order_coupon_code_used"] = "order_coupon_code_used";
    OrderCollections["order_ref_code_used"] = "order_ref_code_used";
    OrderCollections["order_time"] = "order_time";
    OrderCollections["order_total_price"] = "order_total_price";
    OrderCollections["order_status"] = "order_status";
    OrderCollections["product_id"] = "product_id";
    OrderCollections["order_quantity"] = "order_quantity";
    OrderCollections["product_size_id"] = "product_size_id";
})(OrderCollections = exports.OrderCollections || (exports.OrderCollections = {}));
var RefCodeCollections;
(function (RefCodeCollections) {
    RefCodeCollections["ref_by"] = "ref_by";
    RefCodeCollections["ref_coupon_name"] = "ref_coupon_name";
    RefCodeCollections["ref_coupon_description"] = "ref_coupon_description";
    RefCodeCollections["ref_coupon_discount"] = "ref_coupon_discount";
    RefCodeCollections["ref_coupon_max_discount"] = "ref_coupon_max_discount";
    RefCodeCollections["ref_coupon_min_required_amount"] = "ref_coupon_min_required_amount";
    RefCodeCollections["ref_coupon_min_required_quantity"] = "ref_coupon_min_required_quantity";
    RefCodeCollections["ref_coupon_created_date"] = "ref_coupon_created_date";
    RefCodeCollections["ref_coupon_expire_date"] = "ref_coupon_expire_date";
    RefCodeCollections["ref_coupon_limit"] = "ref_coupon_limit";
})(RefCodeCollections = exports.RefCodeCollections || (exports.RefCodeCollections = {}));
var QuotationCollections;
(function (QuotationCollections) {
    QuotationCollections["user_email"] = "user_email";
    QuotationCollections["user_mobile"] = "user_mobile";
    QuotationCollections["user_description"] = "user_description";
})(QuotationCollections = exports.QuotationCollections || (exports.QuotationCollections = {}));
var ProductCollections;
(function (ProductCollections) {
    ProductCollections["product_category_id"] = "product_category_id";
    ProductCollections["product_quantity"] = "product_quantity";
    ProductCollections["product_title"] = "product_title";
    ProductCollections["product_description"] = "product_description";
    ProductCollections["product_detail"] = "product_detail";
    ProductCollections["product_price"] = "product_price";
    ProductCollections["product_size"] = "product_size";
    ProductCollections["product_image_ids"] = "product_image_ids";
    ProductCollections["product_listed_by"] = "product_listed_by";
    ProductCollections["default"] = "default";
    ProductCollections["product_contry"] = "product_contry";
    ProductCollections["product_location"] = "product_location";
})(ProductCollections = exports.ProductCollections || (exports.ProductCollections = {}));
var ProductReviewCollections;
(function (ProductReviewCollections) {
    ProductReviewCollections["product_id"] = "product_id";
    ProductReviewCollections["user_id"] = "user_id";
    ProductReviewCollections["product_rating"] = "product_rating";
    ProductReviewCollections["product_description"] = "product_description";
})(ProductReviewCollections = exports.ProductReviewCollections || (exports.ProductReviewCollections = {}));
var CouponCodeCollections;
(function (CouponCodeCollections) {
    CouponCodeCollections["coupon_name"] = "coupon_name";
    CouponCodeCollections["coupon_description"] = "coupon_description";
    CouponCodeCollections["coupon_discount"] = "coupon_discount";
    CouponCodeCollections["coupon_max_discount"] = "coupon_max_discount";
    CouponCodeCollections["coupon_min_required_amount"] = "coupon_min_required_amount";
    CouponCodeCollections["coupon_min_required_quantity"] = "coupon_min_required_quantity";
    CouponCodeCollections["coupon_created_date"] = "coupon_created_date";
    CouponCodeCollections["coupon_expire_date"] = "coupon_expire_date";
    CouponCodeCollections["first_order_code"] = "first_order_code";
    CouponCodeCollections["couponcode_country_id"] = "couponcode_country_id";
})(CouponCodeCollections = exports.CouponCodeCollections || (exports.CouponCodeCollections = {}));
var UserCollections;
(function (UserCollections) {
    UserCollections["user_email"] = "user_email";
    UserCollections["user_password"] = "user_password";
    UserCollections["user_type"] = "user_type";
})(UserCollections = exports.UserCollections || (exports.UserCollections = {}));
var QrCollections;
(function (QrCollections) {
    QrCollections["User"] = "User";
    QrCollections["Admin"] = "Admin";
})(QrCollections = exports.QrCollections || (exports.QrCollections = {}));
exports.quotes = {
    "morning": [
        "Write it on your heart that every day is the best day in the year. - Ralph Waldo Emerson",
        "I get up every morning and it's going to be a great day. You never know when it's going to be over, so I refuse to have a bad day. - Paul Henderson",
        "Today's goals: Coffee and kindness. Maybe two coffees, and then kindness. - Nanea Hoffman",
        "An early-morning walk is a blessing for the whole day. - Henry David Thoreau",
        "I wake up every morning at nine and grab for the morning paper. Then I look at the obituary page. If my name is not on it, I get up. - Benjamin Franklin",
        "Every morning, I wake up saying, 'I'm still alive, a miracle.' And so I keep on pushing. — Jim Carrey",
        "If you're changing the world, you're working on important things. You're excited to get up in the morning. - Larry Page",
        "When you arise in the morning, think of what a precious privilege it is to be alive, to breathe, to think, to enjoy, to love. - Marcus Aurelius",
        "I like freedom. I wake up in the morning and say, 'I don't know, should I have a popsicle or a donut?' You know, who knows? - Oscar Nunez",
        "Smile in the mirror. Do that every morning and you'll start to see a big difference in your life. - Yoko Ono",
        "Some people dream of success, while other people get up every morning and make it happen. - Wayne Huizenga",
        "Morning comes whether you set the alarm or not. - Ursula K. Le Guin",
        "I used to love night best but the older I get the more treasures and hope and joy I find in mornings. - Terri Guillemets",
        "Morning is an important time of day, because how you spend your morning can often tell you what kind of day you are going to have. - Lemony Snicket"
    ],
    "noon": []
};
// export const prompt = "create schedule for my learning by following bellow details\n 1) course name : meditation 2) schedule time: \n wednesday-sunday : 3 hours \n 3) schedule range : 1 month \n schedule formate in json : columns : [week number,day names,time,topic] \n (Note) : json object should parsable and should contain only those details which has been asked" 
//# sourceMappingURL=enum.js.map