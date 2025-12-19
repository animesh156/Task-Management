import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
//# sourceMappingURL=auth.middleware.js.map