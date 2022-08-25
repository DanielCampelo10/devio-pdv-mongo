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
        const { nome } = req.body;
        const novoPedido = await this.useCase.criar(nome);
        return res.status(200).json(novoPedido);
      } catch (error) {
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    };
  }

  exibir() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const pedido = await this.useCase.exibir(id);
        return res.status(200).json(pedido);
      } catch (error) {
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    };
  }

  adicionarItem() {
    return async (req: Request, res: Response) => {
      try {
        const { id_pedido, id_produto } = req.params;
        const { quantidade } = req.body;
        const novoItem = await this.useCase.adicionarItem(
          id_pedido,
          id_produto,
          quantidade
        );
        return res.status(200).json(novoItem);
      } catch (error) {
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    };
  }
}
