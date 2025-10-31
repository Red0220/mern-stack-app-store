

import Product from "../models/product.model.js";
import { errorHandler } from "../middleware/errorHandler.js";
import { emitToAll } from "../services/socket.services.js";
import mongoose from "mongoose";

export const createProduct = async (req, res, next) => {

  console.log("Request body:", req.files);
  console.log(req.body);
  const { title, description, price, offer, discountPrice, stock , images} =
    req.body;
  

  console.log("Uploaded images:", discountPrice);

  if (!req.user?.isAdmin) {
    return next(errorHandler(401, "You can not add a product!"));
  }

  try {
    const newProduct = new Product({
      title,
      description,
      price,
      offer,
      discountPrice,
      stock,
      images,
      createdBy :req.user._id
    });
    const p = await newProduct.save();

    emitToAll("admin_room", "admin-notification", {
      type: "product-created",
      title: p.title ,
      productId: p._id,
      createdBy: req.user.username,
    });
    res.status(201).json({
      success: true,
      message: "Product created succussfully",
      product: p,
    });
  } catch (error) {
    next(error);
  }
};


export const getProductById = async (req, res, next) => {
  const { productId } = req.params ;

  try {
    const product = await Product.findById(productId) ;
     
    if(!product) {
      return next(errorHandler(404, 'Product not found.'))
    }
    res.status(200).json({
      success :true ,
      product 
    })
  } catch (error) {
    next(error)
  }

}

export const getProducts = async (req, res, next) => {

  try {
     const products = await Product.find({})

     if(products.length === 0) {
      return next(errorHandler(404, "No products found."))
     }

     // total products
      const totalProducts = await Product.countDocuments()

     res.status(200).json({
      success : true ,
      products,
      totalProducts
     })
  } catch (error) {
    next(error)
  }
}


export const updateProduct = async (req, res , next) => {
  
}

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  if(!req.user?.isAdmin) {
    return next(errorHandler(403, 'Unauthorized: Admin privileges required.'))
  }

try {

     if(!mongoose.Types.ObjectId.isValid(productId)) {
      return next(errorHandler(400, 'Invalid product ID format'))
     }
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if(!deletedProduct) {
        return next(errorHandler(404, 'Product not found.'))
      }

    res.status(200).json({
      success: true ,
      message : 'Product has been deleted successfully.'
    })
} catch (error) {

  next(error)
}
  
}


