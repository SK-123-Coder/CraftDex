// User login route

import express from 'express'
import {loginController} from '../../controllers/auth_controllers/user.loginAuth.js'

const userLoginRouter = express.Router();

userLoginRouter.post('/login', loginController);

export default userLoginRouter;