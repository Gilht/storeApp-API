import { BrandController } from "./brand.controller";
import { BrandApplication } from "../../application/brand.application";
import { BrandInfrastructure } from "../../infrastructure/brand.infrastructure";
import { BaseRouter } from "../../../shared/interfaces/base-router";
import CacheRedis from "../../../shared/helpers/cache.helper";
import { HandlerErrors } from "../../../shared/helpers/errors.helper";
import { Validators } from "../../../shared/middlewares/validate.middleware";
import { brandSchemas } from "../schemas/schema";

const infrastructureBrand = new BrandInfrastructure();
const application = new BrandApplication(infrastructureBrand);
const controller = new BrandController(application);

export default class extends BaseRouter {
  constructor() {
    super(controller, "brand");
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
      Validators.validate(brandSchemas.INSERT),
      HandlerErrors.catchError(controller.add)
    );
    this.expressRouter.put(
      "/:id",
      Validators.validate(brandSchemas.UPDATE),
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
