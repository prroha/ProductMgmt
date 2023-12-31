import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import initRoutes from "./routes/index.js";
import config from "./config/index.js";
import "./db/initdb.js";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // parse req.body
app.use(cookieParser());

// Initialize routes
initRoutes(app);
//error handler
app.use(errorHandler);

export default app;
