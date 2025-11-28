import ApiError from "../utils/ApiError.js";

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new ApiError(401, "Unauthorized: Login required");
        }

        const userRoles = req.user.role
        if (!allowedRoles.includes(userRoles)) {
            throw new ApiError(403, `Access denied: Only [${allowedRoles.join(", ")}] allowed`);
        }
        next()

    }
}