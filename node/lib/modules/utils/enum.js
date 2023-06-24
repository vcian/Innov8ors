"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrCollections = exports.UserCollections = exports.CouponCodeCollections = exports.ProductReviewCollections = exports.ProductCollections = exports.QuotationCollections = exports.RefCodeCollections = exports.OrderCollections = exports.LocationCollections = exports.ProductCategoryCollections = exports.UserDetailsCollections = exports.UserType = exports.Collections = exports.AuthStrategy = exports.AuthTypes = exports.StatusType = void 0;
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
//# sourceMappingURL=enum.js.map