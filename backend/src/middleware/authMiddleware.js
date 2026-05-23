import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {

    try {

        const token = req.headers.authorization;

        if (!token) {

            return res.status(401).json({
                message: "No Token Found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Unauthorized"
        });
    }
};

export default protect;