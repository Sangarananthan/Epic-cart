import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(PORT, () => console.log(`Server running @${PORT}`));
