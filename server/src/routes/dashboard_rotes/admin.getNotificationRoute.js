// Get data controller route

import express from 'express'
import {getAdminNotifications} from '../../controllers/dashboard_controller/admin.getNotification.js'

const getNotification = express.Router();

getNotification.get('/getNotification', getAdminNotifications);

export default getNotification;