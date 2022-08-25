import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/pedidos",  controller.criar());

export default routes;