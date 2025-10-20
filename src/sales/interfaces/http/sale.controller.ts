import { Request, Response } from "express";
import { Logger } from "../../../shared/helpers/logging.helper";
import { Trace } from "../../../shared/helpers/trace.helper";
import { SaleFactory } from "../../domain/models/sale.factory";
import { SaleApplication } from "../../application/sale.application";

export class SaleController {
  constructor(private application: SaleApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.getPage = this.getPage.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "SaleController",
      typeAction: "list",
      traceId: Trace.traceId(true),
      message: "List all sales",
      query: JSON.stringify({}),
      datetime: new Date(),
    });

    const sales = await this.application.findAll({}, ["details"], {});
    res.json(sales);
  }

  async listOne(req: Request, res: Response) {
    Trace.traceId(true);
    const sale = await this.application.findOne(
      { id: +req.params.id },
      ["details"]
    );
    res.json(sale);
  }

  async getPage(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "SaleController",
      typeAction: "getPage",
      traceId: Trace.traceId(true),
      message: "Get page of sales",
      query: JSON.stringify(req.query),
      datetime: new Date(),
    });

    const page = parseInt(req.query.page as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const sales = await this.application.getPage(
      page,
      pageSize,
      { active: true },
      ["details"],
      {}
    );
    res.json(sales);
  }

  async add(req: Request, res: Response) {
    Trace.traceId(true);

    // Calcular totales
    const details = req.body.details.map((detail: any) => {
      detail.subtotal = detail.quantity * detail.unitPrice;
      return detail;
    });

    const subtotal = details.reduce(
      (sum: number, detail: any) => sum + detail.subtotal,
      0
    );
    const discount = req.body.discount || 0;
    const total = subtotal - discount;

    const saleData = {
      ...req.body,
      details,
      subtotal,
      total,
    };

    const sale = new SaleFactory().create(saleData);
    const result = await this.application.add(sale);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    Trace.traceId(true);
    const saleToUpdate: any = { id: +req.params.id, ...req.body };
    const sale = new SaleFactory().create(saleToUpdate);
    const result = await this.application.update(sale, {}, []);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    Trace.traceId(true);
    const id = +req.params.id;
    const result = await this.application.delete({ id });
    res.json(result);
  }
}
