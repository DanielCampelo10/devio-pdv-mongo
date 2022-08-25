import { Model, Schema } from "mongoose";
import { IPedido } from "../../models/Pedido";
import IRepository from "../IRepository";

export default class PedidoRepository implements IRepository {
  private pedidoModel: any;
  constructor(pedidoModel: Model<IPedido>) {
    this.pedidoModel = pedidoModel;
  }
  async create(payload: {}) {
    return this.pedidoModel.create(payload);
  }

  async find() {
    return this.pedidoModel.find();
  }

  async findById(id: any) {
    return this.pedidoModel.findById(id);
  }

  async update(id: any, payload: {}) {
    return await this.pedidoModel.findByIdAndUpdate({ _id: id }, payload);
  }

  async delete(id: any) {
    return await this.pedidoModel.findByIdAndDelete({ _id: id });
  }

  async count(payload: any) {
    return await this.pedidoModel.count(payload);
  }
}
