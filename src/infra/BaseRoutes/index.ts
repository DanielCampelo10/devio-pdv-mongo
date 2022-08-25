import { Router } from "express";

import produtoRoutes from "../../modules/Produto/routes"
//import pedidoRoutes from "../../modules/Pedido/routes"

const routes = Router();

routes.use(produtoRoutes);
//routes.use(pedidoRoutes);

export default routes;