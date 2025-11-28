import express from 'express'
import { employerProfileController, updateEmployerProfileController } from './employer.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { authorizeRoles } from '../../middlewares/authorizeRoles.js'


const router = express.Router()

router.route('/').post(authMiddleware, authorizeRoles('employer'), employerProfileController)
router.route('/').patch(authMiddleware, authorizeRoles('employer'), updateEmployerProfileController)



export default router