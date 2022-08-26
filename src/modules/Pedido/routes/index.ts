import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/pedidos",  controller.criar());
routes.get("/pedidos/:id",  controller.exibir());
routes.post("/pedidos/:id_pedido/add/produto/:id_produto",  controller.adicionarItem());
routes.delete("/pedidos/:id_pedido/remove/item/:id_item",  controller.removerItem());
routes.put("/pedidos/:id_pedido/edit/item/:id_item",  controller.editarItem());
routes.put("/pedidos/finalizar/:id_pedido",  controller.finalizarPedido());
routes.get("/pedidos/status/:status",  controller.filtrarStatus());
//routes.post("/pedidos/:id/status/:status",  controller.alterarStatus());

export default routes;