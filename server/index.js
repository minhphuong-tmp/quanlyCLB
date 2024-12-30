import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import loginRoute from "./routes/login.js";
import dotenv from "dotenv";
import Students from "./routes/student.js";
import Posts from "./routes/post.js";
import { app, server } from "./socket/index.js";
const PORT = process.env.PORT || 5000;

dotenv.config();

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sinhvien.youwj.mongodb.net/student_management?retryWrites=true&w=majority`;


app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindandModify: false

  })
  .then(() => {
    console.log("Kết nối tới database thành công!");
  })
  .catch((error) => {
    console.log("Lỗi kết nối tới database:", error);
  });

app.use("/", loginRoute);

app.use("/", Students);

app.use("/", Posts);

server.listen(PORT, () => console.log(`Server running on port ${PORT} `));
