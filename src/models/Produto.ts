import { Schema, model } from "mongoose";

export interface IProduto {
  codigo: number;
  nome: string;
  categoria: string;
  imagem: string;
  preco: number;
  quant_vendidos: number;
}

const produtoSchema = new Schema<IProduto>(
  {
    codigo: {
      type: Schema.Types.Number,
    },
    nome: {
      type: Schema.Types.String,
    },
    categoria: {
      type: Schema.Types.String,
    },
    imagem: {
      type: Schema.Types.String,
    },
    preco: {
      type: Schema.Types.Number,
    },
    quant_vendidos: {
      type: Schema.Types.Number,
    },
  },
  { timestamps: true }
);

export default model<IProduto>("Produto", produtoSchema);
