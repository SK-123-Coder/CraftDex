import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;

let visitorId = localStorage.getItem("visitorId");
if (!visitorId) {
  visitorId = crypto.randomUUID();
  localStorage.setItem("visitorId", visitorId);
}

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
  auth: { visitorId },

  reconnection: true,
  reconnectionAttempts: Infinity,   // keep retrying
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

// // 🔥 DEBUG LOGS
// socket.on("connect", () => {
//   console.log("Socket Connected");
//   console.log("Socket ID:", socket.id);
//   console.log("Connected to:", socket.io.uri);
// });

// socket.on("connect_error", (err) => {
//   console.log("Connection Error");
//   console.log("Message:", err.message);
//   console.log("Description:", err.description);
//   console.log("Type:", err.type);
// });

// socket.on("disconnect", (reason) => {
//   console.log("Disconnected:", reason);
// });

// socket.on("reconnect_attempt", () => {
//   console.log("Trying to reconnect...");
// });

// socket.on("reconnect", (attempt) => {
//   console.log("Reconnected after", attempt, "attempts");
// });

// socket.on("reconnect_failed", () => {
//   console.log("Reconnection failed");
// });


export default socket;