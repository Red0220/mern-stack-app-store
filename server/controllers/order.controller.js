import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { errorHandler } from "../middleware/errorHandler.js";
import { calculateTotal } from "../utilities/calculate.total.js";
import mongoose from "mongoose";
import { emitToAdmins, emitToUser } from "../services/socket.services.js";
import { validateOrderItems } from "../utilities/validate.orderItems.js";

export const createOrder = async (req, res, next) => {

  const session = await mongoose.startSession();

  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      return next(errorHandler(400, "No order items"));
    }

    session.startTransaction();

    const products = await Product.find({
      _id: { $in: orderItems.map((i) => i.product) },
    }).session(session);

    const dbOrderItems = [];
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));
    for (const item of orderItems) {
      const product = await validateOrderItems(item, productMap, session);
      product.stock -= item.quantity;
      await product.save({ session });

      dbOrderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });
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
      isDelivered: false,
    });

    const createdOrder = await order.save({ session });
    await session.commitTransaction();

    //socket.io notifications
    
      emitToAdmins("order:created:v1", {
        orderId: createdOrder._id,
        userId: req.user._id,
        totalPrice: createdOrder.totalPrice,
        createdAt: createdOrder.createdAt,
      });
      emitToUser(req.user._id, "order:created:v1", {
        orderId: createdOrder._id,
        totalPrice: createdOrder.totalPrice,
        itemCount: createdOrder.orderItems.length,
        createdAt: createdOrder.createdAt,
      });
   
    //send response
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  } finally {
    session.endSession();
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!order) {
      return next(errorHandler(404, "Order not found"));
    }
    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return next(errorHandler(403, "Not authorized to view this order"));
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
/*** ------------------
         Get all orders for logged in user
 *****/
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
/*** ------------------
 Get all orders - Admin only 
 *****/
export const getAllOrders = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "Not authorized to view all orders"));
    }

    const orders = await Order.find().populate("user", "id name");

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderToPaid = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return next(errorHandler(404, "Order not found"));
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();

    emitToUser(order.user, "order:paid:v1", {
      orderId: updatedOrder._id,
      paidAt: updatedOrder.paidAt,
      totalPrice: updatedOrder.totalPrice,
    });
    emitToAdmins("order:paid:v1", {
      orderId: updatedOrder._id,
      userId: order.user,
      paidAt: updatedOrder.paidAt,
      totalPrice: updatedOrder.totalPrice,
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrderToDelivered = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "Not authorized to update order delivery status"));
    }

    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return next(errorHandler(404, "Order not found"));
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    emitToUser(order.user, "order:delivered:v1", {
      orderId: updatedOrder._id,
      deliveredAt: updatedOrder.deliveredAt,
    });
    emitToAdmins("order:delivered:v1", {
      orderId: updatedOrder._id,
      userId: order.user,
      deliveredAt: updatedOrder.deliveredAt,
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
