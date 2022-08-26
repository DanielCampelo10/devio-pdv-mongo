import { ObjectId, Schema } from "mongoose";
import IRepository from "../../../repositories/IRepository";
import Pedido, { IPedido } from "../../../models/Pedido";
import Produto from "../../../models/Produto";
import Item, { IItem } from "../../../models/Item";
import ApiError from "../../../infra/errors";
// import printer from "../../../infra/config/printer";

export default class PedidoUseCase {
  private repository: IRepository;
  constructor(pedidoRepository: IRepository) {
    this.repository = pedidoRepository;
  }

  async criar(nome: string) {
    if (nome == "" || !nome) {
      throw new ApiError("preencha seu nome", 400);
    }
    const novoPedido = await this.repository.create({
      nome_cliente: nome,
      status: "carrinho",
    });
    return novoPedido;
  }

  async exibir(id: string) {
    const pedido = await this.repository.findById({ _id: id });
    if (!pedido) {
      throw new ApiError("pedido não encontrado", 404);
    }
    return pedido.populate("itens");
  }

  async adicionarItem(
    id_pedido: string,
    id_produto: string,
    quantidade: number
  ) {
    const produtoAdicionado = await Produto.findById({ _id: id_produto });
    const pedido = await Pedido.findById({ _id: id_pedido });
    
    let itemExistente: IItem[] | ObjectId[] = [];
    let valorAtual = 0;

    if (pedido) {
      if (pedido.status != "carrinho") {
        throw new ApiError(
          `Não é possível adicionar itens em um pedido no status ${pedido.status}`,
          401
        );
      }
      if (!produtoAdicionado) {
        throw new ApiError("produto não encontrado", 404);
      }
      if (quantidade <= 0) {
        throw new ApiError("A quantidade precisa ser maior que 0", 400);
      }
      itemExistente = pedido.itens;
      valorAtual = pedido.valor_total;
    } else {
      throw new ApiError("pedido não encontrado", 404);
    }

    const novoItem = await Item.create({
      produto: produtoAdicionado,
      quantidade: quantidade,
      valor_vendido: produtoAdicionado?.preco,
    });

    await Pedido.findByIdAndUpdate(id_pedido, {
      itens: [...itemExistente, novoItem],
      valor_total: valorAtual + quantidade * novoItem.valor_vendido,
    });
    return novoItem;
  }

  async removerItem(id_pedido: string, id_item: string) {
    const itemRemovido = await Item.findById({ _id: id_item });
    const pedido = await Pedido.findById({ _id: id_pedido });

    let valorItemRemovido = 0;
    let valorAtual = 0;

    if (pedido) {
      if (pedido.status != "carrinho") {
        throw new ApiError(
          `Não é possível adicionar itens em um pedido no status ${pedido.status}`,
          401
        );
      }
      if (!itemRemovido) {
        throw new ApiError("item não encontrado", 404);
      }
      valorAtual = pedido.valor_total;
    } else {
      throw new ApiError("pedido não encontrado", 404);
    }
    if (itemRemovido) {
      valorItemRemovido =
        itemRemovido?.quantidade * itemRemovido?.valor_vendido;
    }
    
    await Pedido.findByIdAndUpdate(id_pedido, {
      valor_total: valorAtual - valorItemRemovido,
    });
    return
  }

  async editarItem(id_pedido: string, id_item: string, quantidade: number) {
    const itemEditado = await Item.findById({ _id: id_item });
    const pedido = await Pedido.findById({ _id: id_pedido });
    
    let alteracaoValor = 0;
    let valorAtual = 0;
    
    if (pedido) {
      if (pedido.status != "carrinho") {
        throw new ApiError(
          `Não é possível adicionar itens em um pedido no status ${pedido.status}`,
          401
        );
      }
      if (!itemEditado) {
        throw new ApiError("item não encontrado", 404);
      }
      if (quantidade <= 0) {
        throw new ApiError("A quantidade precisa ser maior que 0", 400);
      }
      
      valorAtual = pedido.valor_total;
    }else {
      throw new ApiError("pedido não encontrado", 404);
    }
    
    if (itemEditado) {
      alteracaoValor =
        (quantidade - itemEditado?.quantidade) * itemEditado?.valor_vendido;
    }

    await Pedido.findByIdAndUpdate(id_pedido, {
      valor_total: valorAtual + alteracaoValor,
    });
    await Item.findByIdAndUpdate(id_item, {
      quantidade: quantidade,
    });

    const itemAtualizado = Item.findById(id_item);
    return itemAtualizado;
  }

  async finalizarPedido(id_pedido: string, pagamento: number) {
    const pedido = await Pedido.findById(id_pedido);

    if (pedido) {
      if (pagamento < pedido.valor_total) {
        throw new ApiError("Valor insuficiente para pagar o pedido", 400);
      }
      await Pedido.findByIdAndUpdate(id_pedido, {
        valor_recebido: pagamento,
        troco: pagamento - pedido.valor_total,
        status: "pendente",
      });
    } else {
      throw new ApiError("Pedido não encontrado", 404);
    }
    const pedidoAtualizado = await Pedido.findById({ _id: id_pedido });

    // printer.alignCenter();
    // printer.println("Restaurante morte lenta");
    // const numeroPedido = Pedido.countDocuments()
    // printer.alignLeft();
    // printer.println(`pedido numero ${numeroPedido}`);
    // printer.drawLine();
    // pedido.itens.forEach(item=>{
    //   const itemAtual = Item.findById(item)
    //   const produtoAtual = Produto.findById(itemAtual.produto)
    //   printer.println(`${itemAtual.quantidade} x ${produtoAtual.nome} ${itemAtual.valor_vendido}`);
    // });
    // printer.drawLine();
    // printer.println(`subtotal: ${pedido.valor_total}`);
    // printer.println(`pagamento ${pagamento}`);
    // printer.println(`troco ${pedido.valor_total - pagamento}`);
    // printer.cut();
    // printer.beep();

    return pedidoAtualizado?.populate("itens");
  }

  async filtrarStatus(status: string) {
    if (status != "pendente" && status != "preparo" && status != "concluido") {
      throw new ApiError("status de pedido invalido", 400);
    }

    const pedidos = await Pedido.find({ status: status });
    return pedidos;
  }

  async alterarStatus(id_pedido: string, status: string) {
    const pedido = await Pedido.findById(id_pedido);
    if (!pedido) {
      throw new ApiError("pedido não encontrado", 404);
    }
    if (pedido.status == "concluido") {
      throw new ApiError(
        "Pedido concluido! O status não pode ser alterado.",
        401
      );
    }
    if (status != "pendente" && status != "preparo" && status != "concluido") {
      throw new ApiError("status de pedido invalido", 400);
    }
    await Pedido.findByIdAndUpdate(id_pedido, {
      status: status,
    });
    const pedidoAtualizado = await Pedido.findById(id_pedido);
    return pedidoAtualizado;
  }
}
