import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRouter from './modules/auth/auth.route.js'
import employerRouter from './modules/employers/employer.route.js'
import jobsRouter from './modules/jobs/job.route.js'

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/employer', employerRouter)
app.use('/api/jobs', jobsRouter)

app.use(errorMiddleware)


export default app;
