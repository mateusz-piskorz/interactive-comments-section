import { io } from "socket.io-client";

const SERVER_URL_BASE =
  process.env.REACT_APP_BACKEND_SERVER_URL || "http://localhost:3001";

export const socket = io(
  SERVER_URL_BASE
  //      {
  //   path: "/systemcommentsws/socket.io",
  // }
);
