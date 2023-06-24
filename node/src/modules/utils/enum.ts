export enum StatusType {
    Pending = "pending",
    New = "new",
    Approved = "approved"
} 

export enum AuthTypes{
    Email="email",
    Mobile="mobile"
}

export enum KnowledgeLevelType{
    Begginer="begginer",
    Intermediate="intermediate",
    Expert="expert"
}

export enum DurationType{
    Months="months",
    Days = "days",
    Weeks="weeks"
}

export enum TimePreferenceType{
    Morning = "morning",
    Noon = "noon",
    Night = "night"
}


export enum LearnigPaceTypes{
    Slow = "slow",
    Average = "average",
    Fast = "fast"
}


export enum LearningStyleTypes{
    Visual = "visual",
    Auditory = "auditory",
    Reading_Writing = "reading_writing",
    Kinesthetic = "kinesthetic"
}

export enum AuthStrategy{
    PassBased="passBased",
    OtpBased="otpBased"
}

export enum Collections{
    UserDetailsCollections = "userdetailscollections",
    UserCollections = "usercollections",  
    ScheduleCollections = "ScheduleCollections",  
    QrCollections="qrcollections",
    CouponCodeCollections="couponcodecollections",
    ProductCollections="productcollections",
    QuotationCollections="quotationcollections",
    RefCodeCollections="refCodecollections",
    OrderCollections="ordercollections",
    LocationCollections = "locationcollections",
    ProductCategoryCollections = "productcategorycollections",
    ProductReviewCollections="ProductReviewCollections",
    TokenCollections = "TokenCollections",
    FormCollections="FormCollections",
    RecommendationCollections = "recommendationCollections"
}


export enum UserType{
    User="User",
    Admin="Admin"
} 


// column names Modelwise

export enum UserDetailsCollections{
    user_id="user_id",
    user_first_name="user_first_name",
    user_last_name="user_last_name",
    user_phone="user_phone",
    user_contry="user_contry",
    user_state="user_state",
    user_city="user_city",
    user_pincode="user_pincode",
    user_landmark="user_landmark",
    user_location="user_location",
    type="type",
    coordinates="coordinates"
} 

export enum ProductCategoryCollections{
    product_category="product_category",
    product_category_location="product_category_location",
}
export enum LocationCollections{
    location_contry="location_contry",
    location_state="location_state"
}
export enum OrderCollections{
    order_by="order_by",
    order_user_detail="order_user_detail",
    order_product="order_product",
    order_coupon_code_used="order_coupon_code_used",
    order_ref_code_used="order_ref_code_used",
    order_time="order_time",
    order_total_price="order_total_price",
    order_status="order_status",
    product_id="product_id",
    order_quantity="order_quantity",
    product_size_id="product_size_id"
}
export enum RefCodeCollections{
    ref_by="ref_by",
    ref_coupon_name="ref_coupon_name",
    ref_coupon_description="ref_coupon_description",
    ref_coupon_discount="ref_coupon_discount",
    ref_coupon_max_discount="ref_coupon_max_discount",
    ref_coupon_min_required_amount="ref_coupon_min_required_amount",
    ref_coupon_min_required_quantity="ref_coupon_min_required_quantity",
    ref_coupon_created_date="ref_coupon_created_date",
    ref_coupon_expire_date="ref_coupon_expire_date",
    ref_coupon_limit="ref_coupon_limit"
} 
export enum QuotationCollections{
    user_email="user_email",
    user_mobile="user_mobile",
    user_description="user_description"
} 
export enum ProductCollections{
    product_category_id="product_category_id",
    product_quantity="product_quantity",
    product_title="product_title",
    product_description="product_description",
    product_detail="product_detail",
    product_price="product_price",
    product_size="product_size",
    product_image_ids="product_image_ids",
    product_listed_by="product_listed_by",
    default="default",
    product_contry="product_contry",
    product_location="product_location",

} 

export enum ProductReviewCollections{
    product_id="product_id",
    user_id="user_id",
    product_rating="product_rating",
    product_description="product_description"
} 

export enum CouponCodeCollections{
    coupon_name="coupon_name",
    coupon_description="coupon_description",
    coupon_discount="coupon_discount",
    coupon_max_discount="coupon_max_discount",
    coupon_min_required_amount="coupon_min_required_amount",
    coupon_min_required_quantity="coupon_min_required_quantity",
    coupon_created_date="coupon_created_date",
    coupon_expire_date="coupon_expire_date",
    first_order_code="first_order_code",
    couponcode_country_id="couponcode_country_id"
} 

export enum UserCollections{
    user_email="user_email",
    user_password="user_password",
    user_type="user_type",
} 

export enum QrCollections{
    User="User",
    Admin="Admin"
} 

export const quotes = {
    "morning":[
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
    "noon":[

    ]
}

// export const prompt = "create schedule for my learning by following bellow details\n 1) course name : meditation 2) schedule time: \n wednesday-sunday : 3 hours \n 3) schedule range : 1 month \n schedule formate in json : columns : [week number,day names,time,topic] \n (Note) : json object should parsable and should contain only those details which has been asked" 