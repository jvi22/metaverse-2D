import { Router } from "express";

export const router = Router();

router.post("/signup", (req, res,) => {
    res.json({
        message: "Signup"
    })
})

router.post("/signin", (req, res) => {
    res.json({
        message: "Signin"
    })
})

router.get("/elements", (req, res) => {
    
})

router.get("/avatars", (req, res) => {
    
})

router.use("/user", userRouter )
router.use("/space", spaceRouter )
router.use("/admin", adminRouter )