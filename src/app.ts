import cors from "cors";
import morgan from "morgan";
import express, { Express, Request, Response } from "express";

const app: Express = express();

app.set("port", process.env.PORT || 4000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
