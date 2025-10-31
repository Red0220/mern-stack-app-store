import { errorHandler } from "./errorHandler.js";

const isValidString = (input) => typeof input === "string" && input.trim().length > 0;
const isValidNum = (val) => val !== undefined && val !== null && !Number.isNaN(Number(val));

export const validateProductInput = (req, res, next) => {
    const body = req.body;

    if (body.price !== undefined && body.price !== '') body.price = Number(body.price);
    if (body.discountPrice !== undefined && body.discountPrice !== '') body.discountPrice = Number(body.discountPrice);
    if (body.stock !== undefined && body.stock !== '') body.stock = Number(body.stock);

    if (body.offer !== undefined) body.offer = body.offer === 'true' || body.offer === true;

    const files = Array.isArray(req.files) ? req.files : [];
    const BASE_URL = `${req.protocol}://${req.get('host')}`;

    const images = files.length
        ? files.map(f => f.filename ? `${BASE_URL}/uploads/${f.filename}` : f.path || '')
        : Array.isArray(body.images)
            ? body.images
            : body.images
                ? [body.images]
                : [];
    const { title, description, price, discountPrice, stock, offer } = body;

    if (!isValidString(title) || !isValidString(description)) {
        return next(errorHandler(400, "Title and Description are required and must be valid strings."));
    }
    if (!isValidNum(price) || price <= 0) {
        return next(errorHandler(400, "Price is required."));
    }
    if (offer && (discountPrice !== undefined && (!isValidNum(discountPrice) || discountPrice <= 0))) {
        return next(errorHandler(400, "Discount Price must be a valid number greater than 0 if provided."));
    }
    if (stock !== undefined && (!isValidNum(stock) || stock < 0)) {
        return next(errorHandler(400, "Stock must be a valid number greater than or equal to 0 if provided."));
    }
    if (offer !== undefined && typeof offer !== "boolean") {
        return next(errorHandler(400, "Offer must be a boolean value if provided."));
    }
    if (!Array.isArray(images) || images.length < 2 ||
        images.some(img => !isValidString(img))) {
        return next(errorHandler(400, "At least 2 valid images are required for the product."));
    }

    req.body = {
        ...body,
        title: title.trim(),
        description: description.trim(),
        price,
        discountPrice,
        stock,
        offer,
        images: images.map(m => String(m)),
    }

    next();
};
