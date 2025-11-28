import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { getEmployerJobsController, postJobController } from './job.controller.js';
import { authorizeRoles } from '../../middlewares/authorizeRoles.js';

const router = express.Router()

router.route('/').post(authMiddleware, authorizeRoles('employer'), postJobController)
router.route('/').get(authMiddleware, authorizeRoles('employer'), getEmployerJobsController)




export default router;