import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();

app.use(helmet());
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);

app.use(routes.home, globalRouter);

export default app;
