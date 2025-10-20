import { SaleController } from "./sale.controller";
import { SaleApplication } from "../../application/sale.application";
import { SaleInfrastructure } from "../../infrastructure/sale.infrastructure";
import { UserInfrastructure } from "../../../users/infrastructure/user.infrastructure";
import { BaseRouter } from "../../../shared/interfaces/base-router";
import CacheRedis from "../../../shared/helpers/cache.helper";
import { HandlerErrors } from "../../../shared/helpers/errors.helper";
import { Validators } from "../../../shared/middlewares/validate.middleware";
import { saleSchemas } from "../schemas/schema";

const infrastructureSale = new SaleInfrastructure();
const infrastructureUser = new UserInfrastructure();
const application = new SaleApplication(infrastructureSale, infrastructureUser);
const controller = new SaleController(application);

export default class extends BaseRouter {
  constructor() {
    super(controller, "sale");
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
      Validators.validate(saleSchemas.INSERT),
      HandlerErrors.catchError(controller.add)
    );
    this.expressRouter.put(
      "/:id",
      Validators.validate(saleSchemas.UPDATE),
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
