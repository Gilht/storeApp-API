import { Request, Response } from "express";
import { Logger } from "../../../shared/helpers/logging.helper";
import { Trace } from "../../../shared/helpers/trace.helper";
import { UserFactory } from "../../../users/domain/models/user.factory";
import { UserApplication } from "../../application/user.application";

export class UserController {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.findByEmail = this.findByEmail.bind(this);
    this.getPage = this.getPage.bind(this);
  }

  async list(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "DriverController",
      typeAction: "list",
      traceId: Trace.traceId(true),
      message: "List all users",
      query: JSON.stringify({}),
      datetime: new Date(),
    });

    const users = await this.application.findAll({}, ["roles"], {});

    console.log("Response from mysql");

    res.json(users);
  }

  async listOne(req: Request, res: Response) {
    Trace.traceId(true);
    const users = await this.application.findOne({ id: +req.params.id }, [
      "roles",
    ]);
    res.json(users);
  }

  async add(req: Request, res: Response) {
    Trace.traceId(true);
    const user = new UserFactory().create(req.body);
    const result = await this.application.add(user);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    Trace.traceId(true);
    const userToInsert: any = { id: req.params.id, ...req.body };
    const user = new UserFactory().create(userToInsert);
    const result = await this.application.update(user, {}, []);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    Trace.traceId(true);
    const id = +req.params.id;
    const users = await this.application.delete({ id });
    res.json(users);
  }

  async findByEmail(req: Request, res: Response) {
    Trace.traceId(true);
    const email = req.params.email;
    console.log("Controller received email:", email);
    const user = await this.application.findByEmail(email);
    res.json(user);
  }

  async getPage(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "UserController",
      typeAction: "getPage",
      traceId: Trace.traceId(true),
      message: "Get page of users",
      query: JSON.stringify(req.query),
      datetime: new Date(),
    });
    console.log("Received query params:", req.query);
    const page = parseInt(req.query.page as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const search = (req.query.search as string) || "";
    console.log("Pagination params - page:", page, "pageSize:", pageSize, "search:", search);
    const users = await this.application.getPage(
      page,
      pageSize,
      { where:search },
      ["roles",],
      {}
    );
    res.json(users);
  }
}
