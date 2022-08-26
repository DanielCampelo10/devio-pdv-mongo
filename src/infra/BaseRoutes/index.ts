import { Router } from "express";

import routesProduto from "../../modules/Produto/routes"
import routesPedido from "../../modules/Pedido/routes"
import routesAPI from "../../modules/API/routes"
const routes = Router();

routes.use(routesProduto);
routes.use(routesPedido);
routes.use(routesAPI);

export default routes;
