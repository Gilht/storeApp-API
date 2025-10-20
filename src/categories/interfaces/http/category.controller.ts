import { Request, Response } from "express";
import { Logger } from "../../../shared/helpers/logging.helper";
import { Trace } from "../../../shared/helpers/trace.helper";
import { CategoryFactory } from "../../domain/models/category.factory";
import { CategoryApplication } from "../../application/category.application";

export class CategoryController {
  constructor(private application: CategoryApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.getPage = this.getPage.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "CategoryController",
      typeAction: "list",
      traceId: Trace.traceId(true),
      message: "List all categories",
      query: JSON.stringify({}),
      datetime: new Date(),
    });

    const categories = await this.application.findAll({}, [], {});
    res.json(categories);
  }

  async listOne(req: Request, res: Response) {
    Trace.traceId(true);
    const category = await this.application.findOne({ id: +req.params.id }, []);
    res.json(category);
  }

  async getPage(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "CategoryController",
      typeAction: "getPage",
      traceId: Trace.traceId(true),
      message: "Get page of categories",
      query: JSON.stringify(req.query),
      datetime: new Date(),
    });

    const page = parseInt(req.query.page as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const categories = await this.application.getPage(page, pageSize, { active: true }, [], {});
    res.json(categories);
  }

  async add(req: Request, res: Response) {
    Trace.traceId(true);
    const category = new CategoryFactory().create(req.body);
    const result = await this.application.add(category);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    Trace.traceId(true);
    const categoryToUpdate: any = { id: +req.params.id, ...req.body };
    const category = new CategoryFactory().create(categoryToUpdate);
    const result = await this.application.update(category, {}, []);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    Trace.traceId(true);
    const id = +req.params.id;
    const result = await this.application.delete({ id });
    res.json(result);
  }
}
