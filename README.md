<p align="center">
  <img src="https://github.com/deviobr/code-patterns/blob/main/images/devio.webp?raw=true" />
</p>

<h1 align="center">PDV – Fast Food / Back-end</h1>

## O Desafio
Desenvolver uma API de gerenciamento de pedidos para um restaurante que substitua o processo de comandas atual. Para isso, o projeto deve atender as seguintes especificações:
- O usuário poderá ver uma pequena quantidade de produtos na tela para seleção rápida.
- O usuário terá a opção de digitar o nome ou código para encontrar o produto.
- O usuário irá poder adicionar/remover itens e acompanhar o resumo do pedido.
- O usuário poderá ver o total e o troco.
- Deverá poder incluir o nome do cliente para ser entregue o pedido.
- Ao finalizar o pedido este deverá ser impresso em uma via para o cliente (impressora térmica), liberando a tela para o próximo pedido.
  - Obs: A solução é muito mais simples do que se parece.
- O pedido deverá aparecer para a cozinha junto ao nome do cliente.
- A cozinha poderá dar baixa nos pedidos concluídos.

## A Solução:
Para solucionar o dado problema, a API foi desenvolvida com os seguinte parêmetros:
- Rota para criação de pedidos, onde o cliente informa o seu nome e a partir dai pode adicionar itens ao pedido;
- Rota para exibir os 10 produtos mais vendidos, exibida ao cliente logo após o preenchimento dos dados;
- Rota para pesquisa de produtos, onde o cliente pode pesquisar a partir do nome ou categoria parcialmente digitados, ou pelo código do produto;
- Rotas para adicionar, editar e remover itens do pedido, mantendo o valor total sempre atualizado;
- Rota para vizualização de pedido, para que o cliente possa consultar os itens do pedido e para posteriormente a cozinha vizualizar os detalhes do pedido;
- Rota para finalização de pedido, onde o cliente deve informar o valor do pagamento em dinheiro, e o mesmo é informado do seu troco. Obs.: A funcionalidade da impressora térmica ficou parcialmente implementada, portanto, os trechos de código desta feature ficaram comentados na aplicação.
- Rota para alterar o status dos pedidos de acordo com o seu andamento;
- Rota para filtrar os pedidos de acordo com o status, para que a cozinha tenha controle dos pedidos pendentes, em preparo e finalizados.

### Links
- [Deploy](https://api-devio-pdv.herokuapp.com/)
- [Documentação](https://app.swaggerhub.com/apis-docs/DanielCampelo10/sistema-de_pdv_devio/1.0.0)
