import { Router } from "express";

import routesProduto from "../../modules/Produto/routes"
import routesPedido from "../../modules/Pedido/routes"

const routes = Router();

routes.use(routesProduto);
routes.use(routesPedido);

export default routes;
