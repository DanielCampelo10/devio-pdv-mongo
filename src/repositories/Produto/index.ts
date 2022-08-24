import { Model, Schema } from "mongoose";
import { IProduto } from "../../models/Produto";
import IRepository from "../IRepository";

export default class ProdutoRepository implements IRepository {
  private produtoModel: any;
  constructor(produtoModel: Model<IProduto>) {
    this.produtoModel = produtoModel;
  }
  async create(payload: {
    codigo: number;
    nome: string;
    categoria: string;
    imagem: string;
    preco: number;
    quant_vendidos: number;
  }) {
    return this.produtoModel.create(payload);
  }

  async find() {
    return this.produtoModel.find();
  }

  async findById(id: any) {
    return this.produtoModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      nome: string;
      descricao: string;
      preco: number | string;
      imagem?: Schema.Types.ObjectId[];
    }
  ) {
    return await this.produtoModel.findByIdAndUpdate({ _id: id }, payload);
  }

  async delete(id: any) {
    return await this.produtoModel.findByIdAndDelete({ _id: id });
  }

  async count(payload: any) {}
}
