import { ObjectId, Schema } from "mongoose";
import IRepository from "../../../repositories/IRepository";
import { IPedido } from "../../../models/Pedido";

export default class PedidoUseCase {
  private repository: IRepository;
  constructor(pedidoRepository: IRepository) {
    this.repository = pedidoRepository;
  }

  async criar(nome: string) {
    const novoPedido = await this.repository.create({
      nome: nome,
      // status: "pendente",
      // itens: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
    });
    return novoPedido;
  }
}