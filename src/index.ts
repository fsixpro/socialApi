import { errorHandler } from "./middlewares/errorHander";
import "colors";
import express from "express";
import db from "./db";
import dotenv from "dotenv";
import routes from "./routes";
import morgan from "morgan";

const { authRouter } = routes;
dotenv.config();
db();
const PORT = process.env.PORT || 6000;
const app = express();
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.underline);
});
