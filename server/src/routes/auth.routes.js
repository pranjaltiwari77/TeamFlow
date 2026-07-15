import express from "express";
import upload from "../middleware/upload.middleware.js";
import { validateRegister } from "../middleware/validate.middleware.js";

import {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
  } from "../controllers/auth.controller.js";
  import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post(
    "/register",
    validateRegister,
    register
  );
  const validateLogin = (req, res, next) => {

    const { email, password } = req.body;
  
    if (!email || !password) {
  
      return res.status(400).json({
        success:false,
        message:"Email and Password required"
      });
  
    }
  
    next();
  
  };
  
  export {
    validateRegister,
    validateLogin,
  };
  router.post(
    "/login",
    validateLogin,
    login
 );
router.post("/login", login);
router.get("/me", protect, getProfile);

router.put(
    "/profile",
    protect,
    upload.single("profileImage"),
    updateProfile
  );

router.put(
  "/change-password",
  protect,
  changePassword
);

export default router;