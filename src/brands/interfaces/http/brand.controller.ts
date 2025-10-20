import { Request, Response } from "express";
import { Logger } from "../../../shared/helpers/logging.helper";
import { Trace } from "../../../shared/helpers/trace.helper";
import { BrandFactory } from "../../domain/models/brand.factory";
import { BrandApplication } from "../../application/brand.application";

export class BrandController {
  constructor(private application: BrandApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.getPage = this.getPage.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "BrandController",
      typeAction: "list",
      traceId: Trace.traceId(true),
      message: "List all brands",
      query: JSON.stringify({}),
      datetime: new Date(),
    });

    const brands = await this.application.findAll({}, [], {});
    res.json(brands);
  }

  async listOne(req: Request, res: Response) {
    Trace.traceId(true);
    const brand = await this.application.findOne({ id: +req.params.id }, []);
    res.json(brand);
  }

  async getPage(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "BrandController",
      typeAction: "getPage",
      traceId: Trace.traceId(true),
      message: "Get page of brands",
      query: JSON.stringify(req.query),
      datetime: new Date(),
    });

    const page = parseInt(req.query.page as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const brands = await this.application.getPage(page, pageSize, { active: true }, [], {});
    res.json(brands);
  }

  async add(req: Request, res: Response) {
    Trace.traceId(true);
    const brand = new BrandFactory().create(req.body);
    const result = await this.application.add(brand);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    Trace.traceId(true);
    const brandToUpdate: any = { id: +req.params.id, ...req.body };
    const brand = new BrandFactory().create(brandToUpdate);
    const result = await this.application.update(brand, {}, []);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    Trace.traceId(true);
    const id = +req.params.id;
    const result = await this.application.delete({ id });
    res.json(result);
  }
}
