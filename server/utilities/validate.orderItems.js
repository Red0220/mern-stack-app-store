import { errorHandler } from "../middleware/errorHandler.js";

export const validateOrderItems = async (item, productMap) => {
  const product = productMap.get(item.product);

  if (!product) {
    throw next(errorHandler(400, `Product not found: ${item.product}`));
  }
  if (item.quantity <= 0) {
    throw next(
      errorHandler(400, `Invalid quantity for product: ${item.product}`),
    );
  }
  if (product.stock < item.quantity) {
    throw next(errorHandler(400, `Insufficient stock for this product`));
  }

  return product;
};
