import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRouter from "./users-router";
import productsRouter from "./products-router";
import authRouter from "./auth-router";
import ordersRouter from "./orders-router";

dotenv.config();

//init
const app: Express = express();
const port: Number = parseInt(process.env.PORT || "8001");

// handle cors
const corsOptions = {
  origin: "*", // to allow only few urls replace "*" with ["http://localhost:3000",""]
};

app.use(cors(corsOptions));

// parses incoming requests with JSON payloads
app.use(express.json());

//! testing only
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server!");
});

// APIs
app.use("/v1/users", usersRouter);
app.use("/v1/products", productsRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/orders", ordersRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: --Server is running at http://localhost:${port}`);
});

export default app;
