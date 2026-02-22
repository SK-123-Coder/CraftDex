// Authentication of admin for dashboard route

import express from 'express'
import {adminAuthController} from "../../controllers/auth_controllers/admin.AuthController.js";

const adminAuthRoute = express.Router();

adminAuthRoute.post('/adminAuth', adminAuthController);

export default adminAuthRoute;