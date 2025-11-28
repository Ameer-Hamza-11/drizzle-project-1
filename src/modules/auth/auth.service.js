import { eq } from "drizzle-orm";
import { db } from "../../config/db.js";
import { Users } from "../../drizzle/schema.js";
import ApiError from "../../utils/ApiError.js";
import argon from 'argon2'
import { signToken } from "../../utils/jwt.js";


export const registerService = async (userData) => {
    try {
        const { username, email, role, phoneNumber, password } = userData;
        const [user] = await db.select().from(Users).where(eq(Users.email, email))
        if (user) throw new ApiError('User already exist', 400);
        const hashedPassword = await argon.hash(password)

        const [result] = await db.insert(Users).values({
            username, email, role, phoneNumber, password: hashedPassword
        })

        return { id: result.insertId, username, email, role, phoneNumber };
    } catch (error) {
        console.log('Error while Registering', error.message);
        throw error
    }

}


export const loginService = async (userData) => {
    try {
        const { email, password } = userData;

        const [user] = await db.select().from(Users).where(eq(Users.email, email))
        if (!user) throw new ApiError('Invalid Credentials', 404);

        const isMatch = await argon.verify(user.password, password)
        if (!isMatch) throw new ApiError('Invalid Credentials', 404);

        const token = signToken({ sub: user.id, email: user.email, role: user.role })

        return { token, id: user.id, email: user.email, role: user.role }

    } catch (error) {
        console.log('Error while logging in', error.message);
        throw error
    }
}