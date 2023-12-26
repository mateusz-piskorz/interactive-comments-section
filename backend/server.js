import express from "express";
import { Server } from "http";
import { Server as ioServer } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import { router as commentsRouter } from "./routes/comments.js";
import { router as usersRouter } from "./routes/users.js";

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
const corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200,
};
console.log(corsOrigin);
const mongoDbUrl =
  process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/myapp";
// commit
const PORT = 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/comments", commentsRouter);
app.use("/users", usersRouter);

const server = new Server(app);
export const io = new ioServer(server, {
  cors: {
    origin: corsOrigin,
  },
});

server.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on("on-writing", (props) => {
    socket.broadcast.emit("on-writing", { ...props, id: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

mongoose.connect(mongoDbUrl).then(() => console.log("Connected to mongoose"));

app.get("/hi", async function (req, res) {
  res.send("Hello world");
});
