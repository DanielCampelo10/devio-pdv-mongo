import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/produtos",  controller.cadastrar());
routes.get("/produtos/maisvendidos", controller.listarMaisVendidos());
routes.get("/produtos/buscar/:texto",  controller.filtrarProdutos());
// routes.get("/produtos/:id",  controller.findOne());
// routes.put("/produtos/:id",  controller.update());
// routes.delete("/produtos/:id",  controller.delete());


export default routes;