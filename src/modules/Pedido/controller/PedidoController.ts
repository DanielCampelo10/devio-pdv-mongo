import { Request, Response } from "express";
import PedidoUseCase from "../useCases/PedidoUseCase";

export default class ProdutoController {
  private useCase: PedidoUseCase;
  
  constructor(useCase: PedidoUseCase) {
    this.useCase = useCase;
  }
  
  criar() {
    return async (req: Request, res: Response) => {
      try {
        const { nome } = req.body

        const novoPedido = await this.useCase.criar(nome);
        
        return res.status(200).json(novoPedido);
      } catch (error) {
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    }
  }
};

