import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true ,
    },
    rating: {
        type : Number,
        required : true,
        

    },
    comment : {
        type : String ,
        required : true ,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
}, { timestamps : true})
//product schema$$$
const productSchema = new mongoose.Schema({

    title : {
        type : String ,
        required : true,
        trim: true

    },
 description: {
        type: String ,
        required : true,
        trim: true
    },
    price : {
        type : Number ,
        required : true ,

    },
    offer : {
        type : Boolean,
        default : false ,
    },
    discountPrice : {
        type: Number ,
        validate :function (v){ return !this.offer || v < this.price } ,
    },
    stock : {
        type : Number,
        required : true ,
        default : 0, 
        min : 0 ,
    },
    images : {
        type: [String],
        required: true 
    },
    rating : {
        type : Number ,
        default : 0,
        min: 0,
        max : 5 ,
    },
    reviews : [reviewSchema],
    
    
}, { timestamps : true}) 

productSchema.virtual('numOfReviews').get(function(){
    return this.reviews.length
})
productSchema.set('toObject', { virtuals :true});
productSchema.set('toJSON', { virtuals: true})
const Product = mongoose.model('Product', productSchema);

export default Product;