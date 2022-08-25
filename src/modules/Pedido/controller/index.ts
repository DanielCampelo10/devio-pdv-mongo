import { pedidoUseCase } from "../useCases";
import PedidoController from "./PedidoController";

const controller = new PedidoController(pedidoUseCase);

export { controller }