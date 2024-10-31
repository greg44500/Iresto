import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
//** MONGO DATABASE CONNECTION */
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
//** MAINS ROUTES */
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

//** ERROR HANDLER */
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});
