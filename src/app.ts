import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";

import { connect } from "./config/database";
import userRoutes from "./routes/user.controller";

export class App {
  private app: Application;
  private port!: string;
  private rootPath: string = "/api/v1";
  private apiPaths = { users: `${this.rootPath}/users` };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
  }

  start() {
    this.connect();
    this.listen();
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port", this.port);
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  private async connect() {
    await connect();
  }
}
