// User signup route

import express from 'express'
import { signUpController } from '../../controllers/auth_controllers/user.signUpAuth.js';

const userSignupRouter = express.Router();

userSignupRouter.post('/signup', signUpController);

export default userSignupRouter;