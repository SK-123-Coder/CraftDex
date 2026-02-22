// Store notification controller route

import express from 'express'
import {adminNotificationStorer} from '../../controllers/dashboard_controller/admin.Notification.js'

const notificationStoreRoute = express.Router();

notificationStoreRoute.post('/NotificationStore', adminNotificationStorer);

export default notificationStoreRoute;