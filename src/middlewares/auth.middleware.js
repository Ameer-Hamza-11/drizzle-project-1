import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = header.split(" ")[1];

    try {
        const decoded = verifyToken(token)
        req.user = decoded
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}