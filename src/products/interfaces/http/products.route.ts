import { ProductController } from "./product.controller";
import { ProductApplication } from "../../application/product.application";
import { ProductInfrastructure } from "../../infrastructure/product.infrastructure";
import { CategoryInfrastructure } from "../../../categories/infrastructure/category.infrastructure";
import { BrandInfrastructure } from "../../../brands/infrastructure/brand.infrastructure";
import { BaseRouter } from "../../../shared/interfaces/base-router";
import CacheRedis from "../../../shared/helpers/cache.helper";
import { HandlerErrors } from "../../../shared/helpers/errors.helper";
import { Validators } from "../../../shared/middlewares/validate.middleware";
import { productSchemas } from "../schemas/schema";

const infrastructureProduct = new ProductInfrastructure();
const infrastructureCategory = new CategoryInfrastructure();
const infrastructureBrand = new BrandInfrastructure();
const application = new ProductApplication(infrastructureProduct, infrastructureCategory, infrastructureBrand);
const controller = new ProductController(application);

export default class extends BaseRouter {
  constructor() {
    super(controller, "product");
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
      Validators.validate(productSchemas.INSERT),
      HandlerErrors.catchError(controller.add)
    );
    this.expressRouter.put(
      "/:id",
      Validators.validate(productSchemas.UPDATE),
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
