import { errorHandler } from "./errorHandler.js";

const isValidString = (input) => typeof input === "string" && input.trim();
const isValidNum = (val) => typeof val === "number" && !isNaN(val);

export const validateProductInput = (req, res, next) => {
    const { title, description, price, offer, discountPrice, stock, images } =
        req.body;

    if (
        !isValidString(title) ||
        !isValidString(description) ||
        !isValidNum(price) ||
        price <= 0 ||
        (offer && typeof offer !== 'boolean') ||
        (discountPrice && (!isValidNum(discountPrice) ||discountPrice <= 0)) ||
        !isValidNum(stock) ||
        stock < 0 ||
        !Array.isArray(images) ||
        images.length === 0 ||
        images.some((img) => !isValidString(img) || !img.startsWith("http"))
    ) {
        return next(
            errorHandler(
                400,
                "Invalid or missing fields. Ensure all fields are covered"
            )
        );
    }
    next();
};
