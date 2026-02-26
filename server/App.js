import express from 'express'
import multer from "multer";
import dotenv from "dotenv";
import connectDB from './src/configs/db.js'
import http from 'http'
import {Server} from 'socket.io'
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

const app = express()
const PORT = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve frontend
const clientDistPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientDistPath));


app.use(cors({
  origin: [
    "https://craftdex.in" // "http://localhost:5173"
  ],
  credentials: true,
}));

dotenv.config();
app.use(express.json());
connectDB();
app.use(cookieParser());


// Controller routes
import userSignupRouter from './src/routes/auth_routes/user.SignupRoute.js'
import userLoginRouter from './src/routes/auth_routes/user.LoginRoute.js'
import adminAuthRoute from './src/routes/auth_routes/admin.AuthRouter.js'
import userAccountRecoverRouter from './src/routes/auth_routes/user.AccountRecoverRoute.js'


import systemInfo_Route from './src/routes/dashboard_rotes/admin.DashboardRoute.js'
import notificationStoreRoute from './src/routes/dashboard_rotes/admin.NotificationRoute.js'
import getNotification from './src/routes/dashboard_rotes/admin.getNotificationRoute.js'

import intersetedEmailRoute from './src/routes/Footer_Route/user.interestedEmailRoute.js'
import searchRoute from './src/routes/Search_Route/user.SearchRoute.js'


import userAuthDetailSender from './src/routes/Auth_middleware/user.AuthDetailSender.js'
import userAuthVerifierRoute from './src/routes/Auth_middleware/user.AuthorizationRoute.js'


// Import of direct controller
import {downloadPdf} from './src/controllers/Tools_Controller/imageToPdfController.js'
// ==========================================================================================================

// Defailt server route
// Default server route
app.get("/", (req, res) => {
  res.send({
    message: "Hello from backend 🚀"
  });
});



// =======================================================================================================
// Live user count and daily active user count

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://craftdex.in"  // "http://localhost:5173"
    ],
    credentials: true,
  },
  transports: ["websocket"],
});

// Online users
let onlineUsers = 0;

// Daily active users
let dailyUsers = new Set();
let currentDate = new Date().toDateString();

io.on("connection", (socket) => {
  // console.log("✅ New socket connection");
  // console.log("Socket ID:", socket.id);
  // console.log("Auth:", socket.handshake.auth);
  // console.log("Origin:", socket.handshake.headers.origin);

  const today = new Date().toDateString();

  if (today !== currentDate) {
    currentDate = today;
    dailyUsers.clear();
  }

  const visitorId = socket.handshake.auth.visitorId;

  onlineUsers++;
  // console.log("Online Users:", onlineUsers);
  io.emit("userCount", onlineUsers);

  if (visitorId) {
    dailyUsers.add(visitorId);
    // console.log("Daily Users:", dailyUsers.size);
    io.emit("dailyActiveUsers", dailyUsers.size);
  }

  socket.on("disconnect", (reason) => {
    // console.log("❌ Socket disconnected:", reason);
    onlineUsers--;
    io.emit("userCount", onlineUsers);
  });
});

// =======================================================================================================



// ================================================ Auth routs ================================================

// Signup Route
app.use('/api/auth', userSignupRouter);

// Login Route
app.use('/api/auth', userLoginRouter);

// Account Recover Route
app.use('/api/auth', userAccountRecoverRouter);

// Admin authentication
app.use('/api/auth', adminAuthRoute);

// ================================================ Admin/Dashboard routs ================================================

// System info
app.use('/api/auth', systemInfo_Route);

// Store Notification info
app.use('/api/auth', notificationStoreRoute);

// Get Notification info
app.use('/api/auth', getNotification);

// ================================================ Footer ====================================================

// Footer email route
app.use('/api/user', intersetedEmailRoute);

// Search route
app.use('/api', searchRoute);





// User verifier route
app.use('/api/user', userAuthVerifierRoute);

// For user authorization
app.use('/api/auth', userAuthDetailSender);

// ==========================================================================================================
// For download route with multer dependencies

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

app.post(
  "/api/downloadPdf",
  upload.array("images"),
  downloadPdf
);

// ==========================================================================================================

// For React Router (important!)
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// ================================================ App ends ================================================

server.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})
