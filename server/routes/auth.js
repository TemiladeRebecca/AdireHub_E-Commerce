import express from "express";

const router = express.Router();

// controllers
import {register, login} from "../controllers/auth.js";
import {requireSignin} from "../middlewares/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/secret", requireSignin, (req, res) => {
    res.json({currentUser: req.user});
});


export default router;