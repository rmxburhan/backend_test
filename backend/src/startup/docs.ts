import { Express } from "express";
import { readFileSync } from "fs";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import path from "path";
const swaggerFile = readFileSync(
  path.join(process.cwd(), "docs/swagger.yaml"),
  "utf-8"
);
const swaggerDocument = YAML.parse(swaggerFile);
import config from "../config";
export default (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
