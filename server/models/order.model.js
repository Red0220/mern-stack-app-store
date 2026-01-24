import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    checkoutId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    orderItems: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            discount: { type: Number, default: 0},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        address2: { type: String },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, },
    shippingPrice: { type: Number, },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    isCheckoutClosed: { type: Boolean, default: false },
    
}, {
    timestamps: true
})
const Order = mongoose.model('Order', orderSchema);
export default Order;