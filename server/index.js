import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import route from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js";
import approvalRoute from "./routes/approvalRoute.js";
import signupRoute from "./routes/signupRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // Allows all origins

dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGO_URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", route);
app.use("/api", userRoute);
app.use("/api", approvalRoute);
app.use("/api", signupRoute);
