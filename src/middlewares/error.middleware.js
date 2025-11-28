import ApiError from "../utils/ApiError.js";

export const errorMiddleware = (err, req, res, next) => {

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }
    console.log('auth Middleware Error:🔥 ', err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' });
}