import { errorHandler } from "./errorHandler.js";

const isValidString = (input) => typeof input === "string" && input.trim().length > 0;
const isValidNum = (val) => {
    const number = Number(val);
    return !isNaN(number) && number >= 0;
};

export const validateProductInput = (req, res, next) => {
    const { title, description, price, offer, discountPrice, stock } =
        req.body;

     const numericFields = ['price', 'discountPrice', 'stock'];
    numericFields.forEach(field => {
        if (req.body[field] !== undefined) {
            req.body[field] = Number(req.body[field]);
        }
    });
    if (
        !isValidString(title) ||
        !isValidString(description) ||
        !isValidNum(price) ||
        price <= 0 ||
        (offer && typeof offer !== 'boolean') ||
        (discountPrice && (!isValidNum(discountPrice) )) ||
        !isValidNum(stock) ||
        stock < 0  
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
