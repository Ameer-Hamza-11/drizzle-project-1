import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"
import { employerProfileService, updateEmployerProfileService } from "./employer.service.js"
import { employerSchema } from "./employer.validator.js"


export const employerProfileController = async (req, res, next) => {
    try {
        const result = employerSchema.safeParse(req.body)
        if (!result.success) {
            return next(new ApiError(result.error.message,400))
            
        }
        const data = await employerProfileService(result.data, req.user.sub)
        return res.status(201).json(new ApiResponse(201, data, 'Employer Profile Created Successfully'))

    } catch (error) {
        next(error)
    }
}


export const updateEmployerProfileController = async (req, res, next) => {
    try {
        const result = employerSchema.safeParse(req.body)
        if (!result.success) {
            return next(new ApiError(result.error.message,400))
        }
        
        const data = await updateEmployerProfileService(req.body, req.user.sub)
        return res.status(200).json(new ApiResponse(200, data, 'Profile Updated SuccessFully'))

    } catch (error) {
        next(error)
    }
}