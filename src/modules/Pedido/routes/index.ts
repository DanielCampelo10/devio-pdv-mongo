import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/pedidos",  controller.criar());
routes.get("/pedidos/:id",  controller.exibir());
routes.post("/pedidos/:id_pedido/add/produto/:id_produto",  controller.adicionarItem());

export default routes;