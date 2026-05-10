# Loja — Sistema de Gerenciamento de Pedidos

Aplicação web desenvolvida em **Vue.js 2** para gerenciamento de pessoas (clientes), produtos e pedidos de uma loja. Os dados são persistidos em um arquivo JSON por meio de uma API REST simulada com `json-server`.

O sistema permite o cadastro de clientes e a criação de pedidos compostos por múltiplos itens, com cálculo automático de totais. A interface utiliza o framework **Materialize CSS** (Material Design) e toda a comunicação com o backend é feita via **Axios**.

## Funcionalidades

### Pessoas (Clientes)
- Cadastrar, editar e excluir clientes
- Validação de CPF (11 dígitos) e campos obrigatórios
- Listagem em tabela com nome, CPF e data de nascimento

### Pedidos
- Criar, editar e excluir pedidos
- Selecionar cliente e data de emissão
- Adicionar múltiplos produtos ao pedido com controle de quantidade
- Cálculo automático do subtotal por item e do valor total do pedido
- Listagem com nome do cliente, itens e valor total

### Produtos
- Listagem de produtos disponíveis para seleção nos pedidos

## Tecnologias

| Camada | Biblioteca / Ferramenta |
|---|---|
| Framework frontend | Vue.js 2.6 |
| Gerenciamento de estado | Vuex 3 |
| Roteamento | Vue Router 3 |
| Requisições HTTP | Axios 0.19 |
| UI | Materialize CSS 1.0 |
| Backend simulado | json-server |
| Validação de documentos | cpf-cnpj-validator |
| Build | Vue CLI 4 |

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 10
- npm >= 6
- json-server instalado globalmente

```bash
npm install -g json-server
```

---

## Instalação e Execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar a API REST local

O arquivo de banco de dados fica em `api/data.json`. Execute o servidor a partir dessa pasta:

```bash
cd api
json-server --watch data.json
```

A API ficará disponível em `http://localhost:3000` com os endpoints:

| Endpoint | Recurso |
|---|---|
| `GET/POST /pessoas` | Clientes |
| `GET/PUT/DELETE /pessoas/:id` | Cliente por ID |
| `GET/POST /produtos` | Produtos |
| `GET/PUT/DELETE /produtos/:id` | Produto por ID |
| `GET/POST /pedidos` | Pedidos |
| `GET/PUT/DELETE /pedidos/:id` | Pedido por ID |

### 3. Iniciar o servidor de desenvolvimento

Em outro terminal, na raiz do projeto:

```bash
npm run serve
```

A aplicação ficará disponível em `http://localhost:8080`.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run serve` | Servidor de desenvolvimento com hot-reload |
| `npm run build` | Build de produção em `/dist` |
| `npm run lint` | Verificação e correção de lint |

---

## Estrutura do Projeto

```
web-store/
├── api/
│   └── data.json          # Banco de dados JSON (json-server)
├── public/
│   └── index.html         # Template HTML principal
├── src/
│   ├── components/
│   │   └── Navigation.vue # Barra de navegação
│   ├── router/
│   │   └── index.js       # Rotas da aplicação
│   ├── services/
│   │   ├── config.js      # Configuração base do Axios
│   │   ├── people.js      # Serviço de pessoas
│   │   ├── products.js    # Serviço de produtos
│   │   └── orders.js      # Serviço de pedidos
│   ├── views/
│   │   ├── People.vue     # Tela de gerenciamento de clientes
│   │   └── Orders.vue     # Tela de gerenciamento de pedidos
│   ├── App.vue            # Componente raiz
│   ├── main.js            # Inicialização da aplicação
│   └── store.js           # Store Vuex (estado global)
├── babel.config.js
└── package.json
```

---

## API

A URL base é configurada em [src/services/config.js](src/services/config.js):

```js
baseURL: 'http://localhost:3000/'
```

Para alterar a porta do json-server, atualize esse arquivo e reinicie os dois servidores.

---

## Modelo de Dados

### Pessoa

```json
{
  "id": 1,
  "nome": "João Silva",
  "cpf": "12345678901",
  "dataNascimento": "1990-05-20"
}
```

### Produto

```json
{
  "id": 1,
  "descricao": "Camiseta",
  "valorUnitario": 49.90
}
```

### Pedido

```json
{
  "id": 1,
  "idCliente": 1,
  "dataEmissao": "2026-05-10",
  "valorTotal": 99.80,
  "itens": [
    {
      "id": 1,
      "idProduto": 1,
      "valor": 49.90,
      "quantidade": 2,
      "subtotal": 99.80
    }
  ]
}
```
