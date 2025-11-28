import { eq } from "drizzle-orm";
import { db } from "../../config/db.js";
import { Employer, Users } from "../../drizzle/schema.js";
import ApiError from "../../utils/ApiError.js";

export const employerProfileService = async (userData, id) => {
    try {
        const { companyName, companyBio, companyWebsite, location } = userData;

        const [user] = await db.select().from(Users).where(eq(Users.id, id))
        if (!user) throw new ApiError(404, 'User Not Found');

        if (user.role !== 'employer') throw new ApiError("You don't have access", 403);

        const existing = await db.select().from(Employer).where(eq(Employer.userId, id))

        if (existing.length > 0) {
            throw new ApiError("Employer profile already created", 400);
        }

        await db.insert(Employer).values({ userId: id, companyName, companyBio, companyWebsite, location })

        const [employer] = await db
            .select()
            .from(Employer)
            .where(eq(Employer.userId, id));
        return { employer }
    } catch (error) {
        console.log('Error while Creating Employer Profile:', error.message);
        throw error
    }
}




export const updateEmployerProfileService = async (userData, id) => {
    try {
        const { companyName, companyBio, companyWebsite, location } = userData;
        const [user] = await db.select().from(Users).where(eq(Users.id, id))
        if (!user) throw new ApiError(404, 'User Not Found');

        if (user.role !== 'employer') throw new ApiError("You don't have access", 403);

        const existing = await db.select().from(Employer).where(eq(Employer.userId, id))

        if (existing.length <= 0) {
            throw new ApiError("Profile Does not Exist, Create Your Profile First", 404);
        }

        const result = await db.update(Employer).set({
            userId: id, companyName, companyBio, companyWebsite, location
        }).where(eq(Employer.userId, id))

        return result;

    } catch (error) {
        console.log('Error While Updating Profile:', error.message);

        throw error;
    }
}