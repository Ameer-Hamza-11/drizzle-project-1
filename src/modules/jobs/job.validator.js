import { z } from 'zod'

export const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];

export const jobSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, 'job title must be min 3 characters')
        .max(255, 'job title must be min 255 characters'),
    requirements: z
        .string()
        .trim()
        .min(10, 'requirments must be min 10 characters')
        .max(1000, 'requirments must be max 1000 characters'),
    description: z
        .string()
        .trim()
        .min(10, 'description must be min 10 characters')
        .max(1000, 'description must be max 1000 characters'),
    salaryRange: z
        .string()
        .trim()
        .max(100, 'salary must be max 100 characters')
        .optional()
        .or(z.literal('')),
    jobType: z
        .enum(jobTypes, { error: 'please select a valid jobType' }).default('job_type'),
    location: z.
        string()
        .trim()
        .min(2, 'location must be min 2 characters')
        .max(255, 'location  must be max 255 characters').optional().or(z.literal(""))
        .optional()
        .or(z.literal("")),

})