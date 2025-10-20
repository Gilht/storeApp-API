import { Request, Response } from "express";
import { Logger } from "../../../shared/helpers/logging.helper";
import { Trace } from "../../../shared/helpers/trace.helper";
import { ProductFactory } from "../../domain/models/product.factory";
import { ProductApplication } from "../../application/product.application";

export class ProductController {
  constructor(private application: ProductApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.getPage = this.getPage.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "ProductController",
      typeAction: "list",
      traceId: Trace.traceId(true),
      message: "List all products",
      query: JSON.stringify({}),
      datetime: new Date(),
    });

    const products = await this.application.findAll({}, ["category", "brand"], {});
    res.json(products);
  }

  async listOne(req: Request, res: Response) {
    Trace.traceId(true);
    const product = await this.application.findOne({ id: +req.params.id }, ["category", "brand"]);
    res.json(product);
  }

  async getPage(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "ProductController",
      typeAction: "getPage",
      traceId: Trace.traceId(true),
      message: "Get page of products",
      query: JSON.stringify(req.query),
      datetime: new Date(),
    });

    const page = parseInt(req.query.page as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const search = (req.query.search as string) || "";
    const products = await this.application.getPage(page, pageSize, { search }, ["category", "brand"], {});
    res.json(products);
  }

  async add(req: Request, res: Response) {
    Trace.traceId(true);
    const product = new ProductFactory().create(req.body);
    const result = await this.application.add(product);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    Trace.traceId(true);
    const productToUpdate: any = { id: +req.params.id, ...req.body };
    const product = new ProductFactory().create(productToUpdate);
    const result = await this.application.update(product, {}, []);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    Trace.traceId(true);
    const id = +req.params.id;
    const result = await this.application.delete({ id });
    res.json(result);
  }
}
