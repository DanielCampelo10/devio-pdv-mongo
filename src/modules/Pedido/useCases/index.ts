import { pedidoRepository }  from "../../../repositories";
import PedidoUseCase from "./PedidoUseCase";

const pedidoUseCase= new PedidoUseCase(pedidoRepository);

export { pedidoUseCase };