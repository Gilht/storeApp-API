import express, { Application, Request, Response } from "express";
import RoutesUser from "./users/interfaces/http/users.route";
import RoutesCategory from "./categories/interfaces/http/categories.route";
import RoutesBrand from "./brands/interfaces/http/brands.route";
import RoutesProduct from "./products/interfaces/http/products.route";
import RoutesSale from "./sales/interfaces/http/sales.route";
import AuthRouter from "./auth/interfaces/auth.route";
import { HandlerErrors } from "./shared/helpers/errors.helper";

import helmet from "helmet";
import cors from "cors";

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountMiddlewares();
    this.mountHealthCheck();
    this.mountRoutes();
    this.mountErrors();
  }

  mountMiddlewares(): void {
    // Configuración CORS - permite todas las peticiones de cualquier origen
    this.expressApp.use(cors({
      origin: "*", // En producción, especifica los dominios permitidos
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }));

    this.expressApp.use(helmet());
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true })); // request.body
  }

  mountRoutes(): void {
    this.expressApp.use(
      "/users",
      new RoutesUser().expressRouter
    );
    this.expressApp.use(
      "/categories",
      new RoutesCategory().expressRouter
    );
    this.expressApp.use(
      "/brands",
      new RoutesBrand().expressRouter
    );
    this.expressApp.use(
      "/products",
      new RoutesProduct().expressRouter
    );
    this.expressApp.use(
      "/sales",
      new RoutesSale().expressRouter
    );
    this.expressApp.use("/auth", new AuthRouter().expressRouter);
  }

  mountHealthCheck(): void {
    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("All is good!");
    });

    this.expressApp.get("/healthcheck", (req, res) => {
      res.send("All is good!");
    });
  }

  mountErrors() {
    this.expressApp.use(HandlerErrors.notFound);
    this.expressApp.use(HandlerErrors.generic);
  }
}

export default new App().expressApp;
