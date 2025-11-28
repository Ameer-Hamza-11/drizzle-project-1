import { relations, sql } from "drizzle-orm";
import { mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

//! Tables: 
export const Users = mysqlTable("users", {
    id: varchar('id', { length: 36 }).primaryKey().default(sql`(UUID())`),
    username: varchar('user_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    role: mysqlEnum('role', ['employer', 'applicant', 'admin']).notNull().default('applicant'),
    phoneNumber: varchar('phone_number', { length: 20 }),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow()
})

export const Employer = mysqlTable("employers", {
    id: varchar('id', { length: 36 }).primaryKey().default(sql`(UUID())`),
    userId: varchar('user_id', { length: 36 }).notNull().unique(),
    companyName: varchar('company_name', { length: 255 }).notNull(),
    companyBio: varchar('company_bio', { length: 255 }),
    companyWebsite: varchar('company_website', { length: 255 }),
    location: varchar('location', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow()
})



export const Jobs = mysqlTable("jobs", {
    id: varchar('id', { length: 36 }).primaryKey().default(sql`(UUID())`),
    employerId: varchar('employer_id', { length: 36 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    requirements: varchar('requirements', { length: 1000 }).notNull(),
    description: varchar('description', { length: 1000 }).notNull(),
    location: varchar('location', { length: 255 }),
    salaryRange: varchar('salary_range', { length: 100 }),
    jobType: mysqlEnum('job_type', ['full-time', 'part-time', 'contract', 'internship']).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow()
})


export const Applications = mysqlTable("applications", {
    id: varchar('id', { length: 36 }).primaryKey().default(sql`(UUID())`),
    jobId: varchar('job_id', { length: 36 }).notNull(),
    applicantId: varchar('applicant_id', { length: 36 }).notNull(),
    coverLetter: varchar('cover_letter', { length: 1000 }),
    resumeUrl: varchar('resume_url', { length: 255 }),
    status: mysqlEnum('status', ['pending', 'accepted', 'rejected']).notNull().default('pending'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow()

})


//! relations: 

//? User relations
export const userRelations = relations(Users, ({ many, one }) => ({
    //* user has one employer profile
    employer: one(Employer, {
        fields: [Users.id],
        references: [Employer.userId]
    }),

    //* user has many job applications
    applications: many(Applications)
}))


//? Employer relations
export const employerRelation = relations(Employer, ({ many, one }) => ({
    //* employer belongs to one user
    users: one(Users, {
        fields: [Employer.userId],
        references: [Users.id]
    }),

    //* employer has many job postings
    jobs: many(Jobs)
}))


//? Applications relations
export const ApplicationsRelations = relations(Applications, ({ one }) => ({
    //* application belongs to one user (applicant)
    users: one(Users, {
        fields: [Applications.applicantId],
        references: [Users.id]
    }),

    //* application belongs to one job
    jobs: one(Jobs, {
        fields: [Applications.jobId],
        references: [Jobs.id]
    })
}))


//? Jobs relations
export const JobRselations = relations(Jobs, ({ many, one }) => ({
    //* job belongs to one employer
    employer: one(Employer, {
        fields: [Jobs.employerId],
        references: [Employer.id]
    }),

    //* job has many  applications
    applicants: many(Applications)
}))
