import { CategoryController } from "./category.controller";
import { CategoryApplication } from "../../application/category.application";
import { CategoryInfrastructure } from "../../infrastructure/category.infrastructure";
import { BaseRouter } from "../../../shared/interfaces/base-router";
import CacheRedis from "../../../shared/helpers/cache.helper";
import { HandlerErrors } from "../../../shared/helpers/errors.helper";
import { Validators } from "../../../shared/middlewares/validate.middleware";
import { categorySchemas } from "../schemas/schema";

const infrastructureCategory = new CategoryInfrastructure();
const application = new CategoryApplication(infrastructureCategory);
const controller = new CategoryController(application);

export default class extends BaseRouter {
  constructor() {
    super(controller, "category");
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
      Validators.validate(categorySchemas.INSERT),
      HandlerErrors.catchError(controller.add)
    );
    this.expressRouter.put(
      "/:id",
      Validators.validate(categorySchemas.UPDATE),
      HandlerErrors.catchError(controller.update)
    );
    this.expressRouter.delete(
      "/:id",
      HandlerErrors.catchError(controller.delete)
    );
    this.expressRouter.get(
      "/:id",
      CacheRedis.handle(this.tagName),
      HandlerErrors.catchError(controller.listOne)
    );
  }
}
