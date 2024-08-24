import { io } from "socket.io-client";

const path = process.env.REACT_APP_SOCKET_PATH;
const SERVER_URL_BASE =
  process.env.REACT_APP_BACKEND_SERVER_URL || "http://localhost:3001";

export const socket = io(SERVER_URL_BASE, {
  path,
});
