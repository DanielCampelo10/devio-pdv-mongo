import { Request, Response } from "express";
import ApiError from "../../../infra/errors";
import ProdutoUseCase from "../useCases/ProdutoUseCase";

export default class ProdutoController {
  private useCase: ProdutoUseCase;
  
  constructor(useCase: ProdutoUseCase) {
    this.useCase = useCase;
  }

  cadastrar() {
    return async (req: Request, res: Response) => {
      try {
        const { codigo, nome, categoria, imagem, preco, quant_vendidos } = req.body

        const novoProduto = await this.useCase.cadastrar({
          ...req.body,
        });
        
        return res.status(204).json(novoProduto);
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    }
  }

  listarMaisVendidos(){
    return async (req: Request, res: Response) => {
      try {
        const maisVendidos = await this.useCase.listarMaisVendidos();
        return res.status(200).json(maisVendidos);
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    }
  }

  filtrarProdutos(){
    return async (req: Request, res: Response) => {
      try {
        const { texto } = req.params;

        const produtos = await this.useCase.filtrarProdutos(texto);
        return res.status(200).json(produtos);
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    }
  }
};
