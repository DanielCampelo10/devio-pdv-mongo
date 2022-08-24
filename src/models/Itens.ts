import { Schema, model } from "mongoose";
import { IProduto } from "./Produto";

export interface IItem {
  produto: Schema.Types.ObjectId[] | IProduto[];
  quantidade: number;
  valor_vendido: number;
}

const itemSchema = new Schema<IItem>(
  {
    produto: [
      {
        type: Schema.Types.ObjectId,
        ref: "Produto",
      },
    ],
    quantidade: {
      type: Schema.Types.Number,
    },
    valor_vendido: {
      type: Schema.Types.Number,
    },
  },
  { timestamps: true }
);

export default model<IItem>("Item", itemSchema);
