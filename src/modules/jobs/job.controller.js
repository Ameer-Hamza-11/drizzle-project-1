import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"
import { getEmployerJobService, postjobService } from "./job.service.js"
import { jobSchema } from "./job.validator.js"



export const postJobController = async (req, res, next) => {
    try {
        const result = jobSchema.safeParse(req.body)

        if (!result.success) next(new ApiError(result.error.message, 400));

        const data = await postjobService(result.data, req.user.sub)
        return res.status(201).json(new ApiResponse(201, data, 'Job Created Successfully'))

    } catch (error) {
        next(error)
    }
}


export const getEmployerJobsController = async (req, res, next) => {
    try {
        const result = await getEmployerJobService(req.user.sub)
        return res.status(200).json(new ApiResponse(200, result, 'Job Fetched Successfully'))

    } catch (error) {
        next(error)
    }

}