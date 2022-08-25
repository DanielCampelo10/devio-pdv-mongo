import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/pedidos",  controller.criar());
routes.get("/pedidos/:id",  controller.exibir());
routes.post("/pedidos/:id_pedido/add/produto/:id_produto",  controller.adicionarItem());
routes.delete("/pedidos/:id_pedido/remove/item/:id_item",  controller.removerItem());
routes.put("/pedidos/:id_pedido/edit/item/:id_item",  controller.editarItem());

///pedidos/6307b4bf10b7196a4d97e543/remove/item/63069f916f8e01f673c5503b

export default routes;