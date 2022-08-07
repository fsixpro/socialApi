import "colors";
import express from "express";
import db from "./db";
import dotenv from "dotenv";

dotenv.config();
db();

const app = express();
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.underline);
});
