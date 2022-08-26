import swaggerUi from "swagger-ui-express"
import swaggerDocs from "../swagger.json"
import { Router } from "express";

const routes = Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default routes;