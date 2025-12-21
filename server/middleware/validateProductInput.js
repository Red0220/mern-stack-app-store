import { errorHandler } from "./errorHandler.js";

/*---------------- helper functions ----------------*/

const isValidString = (input) => typeof input === "string" && input.trim().length > 0;
const isValidInt = (val) => Number.isInteger(val) && Number.isFinite(val);

const toCents = (n) => {
    if(n === undefined || n === null || n == '') return undefined;
    const num = Number(n);
    if (!Number.isFinite(num)) return NaN;
    return Math.round(num * 100);
}

/*---------------------- middleware function ----------------------------*/

export const validateProductInput = (req, res, next) => {

    const body = req.body;
    const priceInCents = toCents(body.price);
    const discountPriceInCents = toCents(body.discountPrice);

    if (body.offer !== undefined) {
        body.offer = body.offer === true || body.offer === 'true' ;;
    }
     
    const stockNum = body.stock !== undefined && body.stock !== ''
        ? Number(body.stock)
        : undefined;

        console.log(stockNum, typeof stockNum);
 /*---------------- process images ----------------*/

    const files = Array.isArray(req.files) ? req.files : [];
    const BASE_URL = `${req.protocol}://${req.get('host')}`;

    const images = files.length
        ? files.map(f => f.filename 
            ? `${BASE_URL}/uploads/${f.filename}` 
            : f.path || ''
        )
        : Array.isArray(body.images)
            ? body.images
            : body.images
                ? [body.images]
                : [];
    const { title, description, offer } = body;
       
    // Validations
    if (!isValidString(title) || !isValidString(description)) {
        return next(
            errorHandler(400, "Title and Description are required and must be valid strings.")
        );
    }

    if (!isValidInt(priceInCents) || priceInCents <= 0) {
        return next(
            errorHandler(400, "Price is required.")
        );
    }

    if (offer && (discountPriceInCents !== undefined && (!isValidInt(discountPriceInCents) || discountPriceInCents <= 0))) {
        return next(errorHandler(400, "Discount Price must be a valid integer greater than 0 if provided."));
    }
    if (stockNum !== undefined && (!isValidInt(stockNum) || stockNum < 0)) {
        return next(
            errorHandler(400, "Stock must be a valid integer greater than or equal to 0 if provided.")
        );
    }
    if (offer === true) {

      if(!isValidInt(discountPriceInCents) || discountPriceInCents <= 0) {
        return next(
            errorHandler(400, "Discount Price must be a valid integer greater than 0 if offer is true.")
        );
      }
        if (discountPriceInCents >= priceInCents) {
            return next(
                errorHandler(400, "Discount Price must be less than the original price.")
            );
        }
    }

    if(offer === false && discountPriceInCents > 0) {
        return next(
            errorHandler(400, "Discount Price should not be provided when offer is false.")
        );
    }
    if (!Array.isArray(images) || images.length < 2 ||
        images.some(img => !isValidString(img))) {
        return next(errorHandler(400, "At least 2 valid images are required for the product."));
    }

    req.body = {
        
        title: title.trim(),
        description: description.trim(),
        price: priceInCents,
        discountPrice: discountPriceInCents,
        stock: stockNum,
        offer,
        images: images.map(String),
    }

    next();
};
