import { UserController } from "./user.controller";
import { UserApplication } from "../../application/user.application";
import { UserInfrastructure } from "../../infrastructure/user.infrastructure";
import { BaseRouter } from "../../../shared/interfaces/base-router";
import { RoleInfrastructure } from "../../../roles/infrastructure/role.infrastructure";
import CacheRedis from "../../../shared/helpers/cache.helper";
import { HandlerErrors } from "../../../shared/helpers/errors.helper";
import { Validators } from "../../../shared/middlewares/validate.middleware";
import { userSchemas } from "../schemas/schema";

const infrastructureUser = new UserInfrastructure();
const infrastructureRole = new RoleInfrastructure();
const application = new UserApplication(infrastructureUser, infrastructureRole);
const controller = new UserController(application);

export default class extends BaseRouter {
  constructor() {
    super(controller, "user");
  }

  mountRoutes(): void {}

  override mountRoutesCommons(): void {
    this.expressRouter.get(
      "/",
      CacheRedis.handle(this.tagName),
      HandlerErrors.catchError(controller.list)
    );
    this.expressRouter.get(
      "/page",
      CacheRedis.handle(this.tagName),
      HandlerErrors.catchError(controller.getPage)
    );
    this.expressRouter.post(
      "/",
      Validators.validate(userSchemas.INSERT),
      HandlerErrors.catchError(controller.add)
      //controller.add
    );
    this.expressRouter.put("/:id", HandlerErrors.catchError(controller.update));
    this.expressRouter.delete(
      "/:id",
      HandlerErrors.catchError(controller.delete)
    );
    this.expressRouter.get(
      "/:id",
      CacheRedis.handle(this.tagName),
      HandlerErrors.catchError(controller.listOne)
    );

    this.expressRouter.get(
      "/email/:email",
      CacheRedis.handle(this.tagName),
      HandlerErrors.catchError(controller.findByEmail)
    );
  }
}
