import express, { Express, Request, Response } from "express";
import usersRouter from "./users-router";
import dotenv from "dotenv";

dotenv.config();

//init
const app: Express = express();
const port: Number = parseInt(process.env.PORT || "8001");
// console.log("--port type: ", typeof port, process.env.PORT);

// parses incoming requests with JSON payloads
app.use(express.json());

//! testing only
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server!");
});

// APIs
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log("port type: ", typeof port, process.env.PORT);
  console.log(`⚡️[server]: --Server is running at http://localhost:${port}`);
});

export default app;
