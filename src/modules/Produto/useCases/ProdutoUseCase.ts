import { IProduto } from "../../../models/Produto";
import Produto from "../../../models/Produto";
import { ObjectId } from "mongoose";
import IRepository from "../../../repositories/IRepository";

type PayloadCadastroProduto = IProduto;

export default class ProdutoUseCase {
  private repository: IRepository;
  constructor(produtoRepository: IRepository) {
    this.repository = produtoRepository;
  }

  async cadastrar(payload: PayloadCadastroProduto) {
    const novoProduto = await this.repository.create(payload);
    return novoProduto;
  }

  async listarMaisVendidos() {
    const produtos = await this.repository.find();
    const maisVendidos = produtos
      .sort((a: { quant_vendidos: number }, b: { quant_vendidos: number }) =>
        b.quant_vendidos < a.quant_vendidos ? -1 : 1
      )
      .slice(0, 10);
    return maisVendidos;
  }

  async filtrarProdutos(texto: string | number) {

    
    const categoriaCount = await this.repository.count({ categoria: {$regex: texto, $options: 'i'}});
    if (categoriaCount) {
      const produtos = await this.repository.find({ categoria: {$regex: texto, $options: 'i'}});
      return produtos;
    }

    const nomeCount = await this.repository.count({nome: {$regex: texto, $options: 'i'}});
    console.log(nomeCount);
    
    if (nomeCount) {
      const produtos = await this.repository.find({nome: {$regex: texto, $options: 'i'}});
      return produtos;
    }
    
    const codigoCount = await this.repository.count({ codigo: texto });
    console.log(codigoCount);
    if (codigoCount) {
      const produtos = await this.repository.find({ codigo: texto });
      return produtos;
    }
    
    throw new Error();
  }
}
