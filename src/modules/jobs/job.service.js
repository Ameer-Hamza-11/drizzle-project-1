import { eq } from "drizzle-orm";
import { db } from "../../config/db.js";
import { Employer, Jobs, Users } from "../../drizzle/schema.js";
import ApiError from "../../utils/ApiError.js";



export const postjobService = async (userData, id) => {
    try {
        const { title, requirements, description, location, salaryRange, jobType } = userData;

        const [user] = await db.select().from(Users).where(eq(Users.id, id))
        if (!user) throw new ApiError(404, 'User Not Found');

        if (user.role !== 'employer') {
            throw new ApiError('Only Employer can post Jobs', 400)
        }

        const [employer] = await db.select().from(Employer).where(eq(Employer.userId, id))
        if (!employer) throw new ApiError('Employer does not exist', 404);

        const result = await db.insert(Jobs).values({
            employerId: employer.id,
            title, requirements, description, location, salaryRange, jobType
        })

        return result


    } catch (error) {
        console.log('Error While Posting Job:', error.message);
        throw error;
    }
}




export const getEmployerJobService = async (userId) => {

    try {
        const employer = await db.query.Employer.findFirst({
            where: eq(Employer.userId, userId),
            with: {
                jobs: true,
                users: {
                    columns: {
                        id: true,
                        username: true,
                        email: true,
                        role: true,
                        phoneNumber: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        })
        if (!employer) throw new ApiError("Employer not found",404);
        console.log('employer with:', employer);
        return employer

    } catch (error) {
        console.log('Error while fetching Jobs: ', error.message);
        throw error
    }
}