import { errorHandler } from "../middleware/errorHandler.js"

export const verifyAdmin = async (req, res, next) => {
    
    if(!req.user?.isAdmin) {
        return next(errorHandler(401, 'Unauthorized.'))
    }
    next()
}