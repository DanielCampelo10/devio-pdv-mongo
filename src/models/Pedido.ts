import { Schema, model } from "mongoose";
import { IItem } from "./Itens";

export interface IPedido {
  nome_cliente: string;
  valor_total: number;
  valor_recebido: number;
  troco: number;
  itens: Schema.Types.ObjectId[] | IItem[];
  status: string;
}

const pedidoSchema = new Schema<IPedido>(
  {
    nome_cliente: {
      type: Schema.Types.String,
    },
    itens: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    status: {
      type: Schema.Types.String,
    },
    valor_total: {
      type: Schema.Types.Number,
    },
    valor_recebido: {
      type: Schema.Types.Number,
    },
    troco: {
      type: Schema.Types.Number,
    },
  },
  { timestamps: true }
);

export default model<IPedido>("Pedido", pedidoSchema);
