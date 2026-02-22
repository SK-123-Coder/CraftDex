import express from 'express'
import {intrestedEmailController} from '../../controllers/Footer/user.IntrestedEmail.js'

const intersetedEmailRoute = express.Router();

intersetedEmailRoute.post('/footerEmail', intrestedEmailController);

export default intersetedEmailRoute;