import { ObjectId, Schema } from "mongoose";
import IRepository from "../../../repositories/IRepository";
import Pedido, { IPedido } from "../../../models/Pedido";
import Produto from "../../../models/Produto";
import Item, { IItem } from "../../../models/Item";

export default class PedidoUseCase {
  private repository: IRepository;
  constructor(pedidoRepository: IRepository) {
    this.repository = pedidoRepository;
  }

  async criar(nome: string) {
    const novoPedido = await this.repository.create({
      nome_cliente: nome,
      status: "pendente",
      valor_total: 0,
    });
    return novoPedido;
  }

  async exibir(id: string) {
    const pedido = await this.repository.findById({ _id: id });
    return pedido.populate("itens");
  }

  async adicionarItem(
    id_pedido: string,
    id_produto: string,
    quantidade: number
  ) {
    const produtoAdicionado = await Produto.findById({ _id: id_produto });
    const novoItem = await Item.create({
      produto: produtoAdicionado,
      quantidade: quantidade,
      valor_vendido: produtoAdicionado?.preco,
    });

    const pedido = await Pedido.findById({ _id: id_pedido });
    let itemExistente: IItem[] | ObjectId[] = [];
    let valorAtual = 0;
    if (pedido) {
      itemExistente = pedido.itens;
      valorAtual = pedido.valor_total;
    }

    await Pedido.findByIdAndUpdate(id_pedido, {
      itens: [...itemExistente, novoItem],
      valor_total: valorAtual + quantidade * novoItem.valor_vendido,
    });
    return novoItem;
  }
}
