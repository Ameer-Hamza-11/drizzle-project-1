import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"
import { loginService, registerService } from "./auth.service.js"
import { loginSchema, registerSchema } from "./auth.validator.js"

export const registerController = async (req, res, next) => {
    try {
        const result = registerSchema.safeParse(req.body)
        if (!result.success) {
            return next(new ApiError(result.error.message,400))
        }
        const data = await registerService(result.data)
        return res.status(201).json(new ApiResponse(201, data, 'User Registered Successfully'))
    } catch (error) {
        next(error)
    }
}


export const loginController = async (req, res, next) => {
    try {
        const parsed = loginSchema.safeParse(req.body)
        if (!parsed.success) {
            return next(new ApiError(parsed.error.message,400))
        }
        const data = await loginService(parsed.data)
        return res.status(200).json(new ApiResponse(200, data, 'User Logged In Successfully'))

    } catch (error) {
        next(error)
    }
}