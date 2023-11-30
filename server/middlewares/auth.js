import jwt from "jsonwebtoken"


export const requireSignin = (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.headers.authorization, 
            process.env.JWT_SECRET
        );
        // console.log("decoded => ", decoded);
        req.user = decoded;
        next();
    }   catch (err) {
        return res.status(401).json(err);
    }
};