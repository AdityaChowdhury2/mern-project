import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import userRouter from "./routes/user.js";

const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); //https:localhost:5000/users/signup

const url = process.env.MONGODB_URL;
const port = process.env.PORT || 5001;

mongoose
	.connect(url)
	.then(() => {
		app.listen(port, () => console.log(`server listening on ${port}`));
	})
	.catch((err) => console.log(`${err} did not connect`));
