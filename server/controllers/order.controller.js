import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import { errorHandler } from '../middleware/errorHandler.js'
import { calculateTotal } from '../utilities/calculate.total.js';
import mongoose from 'mongoose';

export const createOrder = async (req, res, next) => {
    const session = await mongoose.startSession()
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;
         
        if (orderItems && orderItems.length === 0) {
            return next(errorHandler(400, 'No order items'));
        }
        
        session.startTransaction();

        const products = await Product.find({
            _id: { $in: orderItems.map((i) => i.product) }
        }).session(session);

        const dbOrderItems = [];
        const productMap = new Map( products.map( p => [p._id.toString(), p] ));
        for (const item of orderItems) {
            const product = productMap.get(item.product);

            if (!product) {
                await session.abortTransaction();
                
                return next(errorHandler(400, `Product not found: ${item.product}`));
            }
            if(item.quantity <= 0){
                await session.abortTransaction();
                return next(errorHandler(400, `Invalid quantity for product: ${item.product}`));
            }
            if(product.stock < item.quantity){
                await session.abortTransaction();
                return next(
                    errorHandler(400, `Insufficient stock for this product`)
                )
            }
            product.stock -= item.quantity;
            await product.save({ session });

            dbOrderItems.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: item.quantity
            })
        }


    

        const { itemsPrice, taxPrice, totalPrice } = calculateTotal(dbOrderItems);

        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
            isPaid: false,
            isDelivered: false
        })

        const createdOrder = await order.save({session});
        await session.commitTransaction();
        res.status(201).json(createdOrder);
    } catch (error) {
        next(error)
    } finally {
        session.endSession();
    }

}

export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return next(errorHandler(404, 'Order not found'));
        }
        const isOwner = order.user._id.toString() === req.user._id.toString();
        const isAdmin = req.user.isAdmin;
        
        if (!isOwner && !isAdmin) {
            return next(errorHandler(403, 'Not authorized to view this order'));
        }
        res.status(200).json(order);

    } catch (error) {
        next(error)
    }
}

export const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId });
        res.status(200).json(orders);
    }catch (error) {
        next(error)
    }
}

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('user', 'id name');
        res.status(200).json(orders);
    }catch (error) {
        next(error)
    }   
}

export const updateOrderToPaid = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        
        if(!order){
            return next(errorHandler(404, 'Order not found'));
        }
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);


    } catch (error) {
        next(error)
    }
}

export const updateOrderToDelivered = async (req, res, next) => {
    try {
 

        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if(!order){
            return next(errorHandler(404, 'Order not found'));
        }
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error)
    }
}
