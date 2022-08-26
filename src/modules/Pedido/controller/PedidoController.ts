import { Request, Response } from "express";
import ApiError from "../../../infra/errors";
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
        return res.status(201).json(novoPedido);
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
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
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
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
        return res.status(201).json(novoItem);
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    };
  }

  editarItem() {
    return async (req: Request, res: Response) => {
      try {
        const { id_pedido, id_item } = req.params;
        const { quantidade } = req.body;
        const novoItem = await this.useCase.editarItem(
          id_pedido,
          id_item,
          quantidade
        );
        return res.status(200).json(novoItem);
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    };
  }

  removerItem() {
    return async (req: Request, res: Response) => {
      try {
        const { id_pedido, id_item } = req.params;
        await this.useCase.removerItem(id_pedido, id_item);
        return res
          .status(204)
          .json("Item removido com sucesso! Confira seu carrinho");
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    };
  }

  finalizarPedido() {
    return async (req: Request, res: Response) => {
      try {
        const { id_pedido } = req.params;
        const { pagamento } = req.body;
        const pedido = await this.useCase.finalizarPedido(id_pedido, pagamento);
        return res.status(200).json(pedido);
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    };
  }

  filtrarStatus() {
    return async (req: Request, res: Response) => {
      try {
        const { status } = req.params;
        const pedidos = await this.useCase.filtrarStatus(status);
        return res.status(200).json(pedidos);
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    };
  }

  alterarStatus() {
    return async (req: Request, res: Response) => {
      try {
        const { id_pedido, status } = req.params;
        const pedido = await this.useCase.alterarStatus(id_pedido, status);
        return res.status(200).json(pedido);
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu um erro, chame o gerente!");
      }
    };
  }
}
