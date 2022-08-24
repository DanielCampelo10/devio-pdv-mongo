import Produto from "../models/Produto";
import Pedido from "../models/Pedido";

import ProdutoRepository from "./Produto";
import PedidoRepository from "./Pedido";

const produtoRepository = new ProdutoRepository(Produto);
const pedidoRepository = new PedidoRepository(Pedido);

export {
  produtoRepository,
  pedidoRepository,
};
