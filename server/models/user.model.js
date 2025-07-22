import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  
    username : {
        type : String,
        required : true ,
        unique : true ,
    },
    email : {
        type : String,
        required : [true, 'Email is required'] ,
        unique : true ,
        match : [/.+\@.+\..+/, 'Please enter a valid email']
    },
    password : {
        type : String,
        required : true ,
        
    },
    
  isAdmin : {
        type : Boolean,
        default : false ,
        
    },
    avatar : {
        type : String ,
        default : 'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg'
    },
    shippingAddress:{
        street :{ type : String},
        city : { type: String} ,
        postalCode : { type : String} ,
        country : { type : String}
    },

}, {timestamps : true}) ;
const User = mongoose.model('User', userSchema)

export default User 