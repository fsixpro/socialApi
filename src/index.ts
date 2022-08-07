import express from "express";
import "colors";

const app = express();
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.underline);
});
