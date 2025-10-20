import { DatabaseListen } from "./bootstrap";
import { DataSource, DataSourceOptions } from "typeorm";
import yenv from "yenv";

const env = yenv();

let source: DataSource;

export default class DatabaseBootstrap extends DatabaseListen {
  static get dataSource() {
    return source;
  }
  listen(): void {
    throw new Error("Method not implemented.");
  }
  initialize(): Promise<DataSource | Error> {
    const parametersConnection = {
      type: "postgres",
      host: env.DATABASES.POSTGRES.HOST || "localhost",
      port: env.DATABASES.POSTGRES.PORT || 5432,
      username: env.DATABASES.POSTGRES.USERNAME || "postgres",
      password: (env.DATABASES.POSTGRES.PASSWORD || "12345").toString(),
      entities: env.DATABASES.POSTGRES.ENTITIES || ["src/**/*.entity.ts"],
      database: env.DATABASES.POSTGRES.NAME || "dbnodejs",
      synchronize: env.DATABASES.POSTGRES.SYNCHRONIZE || true,
      logging: env.DATABASES.POSTGRES.LOGGING || false,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    } as DataSourceOptions;

    const data = new DataSource(parametersConnection);
    source = data;
    return data.initialize();
  }

  closeConnection() {
    source.destroy();
  }
}
