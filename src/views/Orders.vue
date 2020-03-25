<template>
  <div>
    <Navigation></Navigation>

    <div class="container">
      <ul>
        <li v-for="(error, index) of errors" :key="index">
          <div class="card-panel">
            <span class="red-text text-darken-2">*{{error}}</span>
          </div>
        </li>
      </ul>
      
      <h5 class="title">Cadastro de Pedidos</h5>
      <form>
        <label>Cliente</label>          
        <select class="browser-default" id="people" v-model="selectClient">
            <option value="" disabled selected>Escolha um cliente</option>            
            <option v-for="person of peopleArray" :key="person.id" :value="person.id" >{{person.nome}}</option>
        </select>
        <label>Data de Emissão</label>
        <input id="mDate" type="date" v-model="orderAdd.dataEmissao">     
        <label>Itens</label>        
        <select class="browser-default" id="items" v-model="selectItem">
            <option value="" disabled selected>Escolha um Produto</option>            
            <option v-for="product of productsArray" :key="product.id" :value="product.id" >{{product.descricao}} - R${{product.valoUnitario}} </option>
        </select>    
        <div class="row">
          <div class="col s12 m3 l1">
            <p>
            <button @click="addI()" class="waves-effect waves-light btn-small light-blue darken-1">
              Add
              <i class="material-icons left">add</i>
            </button>
            </p>
          </div>
          <div class="col s12 m3 l2">
            <p>
            <button @click="addO()" class="waves-effect waves-light btn-small  brown lighten-2">
              Salvar Pedido
              <i class="material-icons left">save</i>
            </button>  
            </p>
          </div>
          <div class="col s12 m3 l2">
            <p>
            <button  @click="cancelUpdate()" class="waves-effect waves-light btn-small   orange darken-1" v-if="flag">
              Cancelar
              <i class="material-icons left">cancel</i>
            </button>  
            </p>
          </div>
        </div>        
      </form>

      <table class="responsive-table" v-if="Array.isArray(orderAdd.itens) && orderAdd.itens.length">
        <thead  >
          <tr>
            <th>PRODUTO</th>
            <th>VALOR UNITÁRIO</th>
            <th>QUANTIDADE</th>
            <th>VALOR TOTAL</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) of orderAdd.itens" :key="index">
            <td>{{item.produto.descricao}}</td>
            <td>R${{item.valor}}</td>
            <td>{{item.quantidade}}</td>
            <td>R${{item.subtotal}}</td>
            <td>
              <button @click="removeQntd(index)" class="waves-effect btn-small grey darken-1">
                <i class="material-icons">close</i>
              </button>
              <button @click="removeI(index)" class="waves-effect btn-small red darken-1">
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <h5 class="title">Lista de Pedidos</h5>

      <table class="responsive-table">
        <thead>
          <tr>
            <th>NOME DO CLIENTE</th>
            <th>DATA DE EMISSÃO</th>
            <th>ITENS</th>
            <th>VALOR TOTAL</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order of ordersArray" :key="order.id">
            <td>{{order.cliente.nome}}</td>
            <td>{{order.dataEmissao}}</td>
            <td >
                <label v-for="item of order.itens" :key="item.id">
                    <input type="checkbox" checked="checked" disabled="disabled" />
                    <span >{{item.quantidade}} x {{item.produto.descricao}} (R${{item.valor}})</span>
                    <br>
                </label>               
            </td>
            <td>R${{order.valorTotal}}</td>
            <td>
              <button @click="updateO(order)" class="waves-effect btn-small  grey darken-1">
                <i class="material-icons">create</i>
              </button>
              <button @click="removeO(order)" class="waves-effect btn-small  red darken-1">
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navigation from '../components/Navigation'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Orders',
  components: {
      'Navigation': Navigation
  },  

  data() {
    return {
      orderAdd: {
        id: "",
        cliente: {},
        dataEmissao: "",
        valorTotal: 0.0,
        itens: []        
      },
      selectClient: "",
      selectItem: "",
      errors: [],
      flag: false
    };
  },

  mounted() {
    this.listPeople();
    this.listOrders();
    this.listProducts();
  },

  computed: {
    ...mapState(['peopleArray', 'ordersArray', 'productsArray'])
  },

  methods: {
    ...mapActions(['addOrder', 'updateOrder', 'removeOrder', 'addItem', 'removeItem', 'listProducts', 'listOrders', 'listPeople']),

    clearData()
    {
      this.orderAdd.id = "";
      this.orderAdd.dataEmissao = "";
      this.orderAdd.cliente = {};
      this.orderAdd.valor = 0;
      this.orderAdd.itens = [];
      this.selectClient = "";
      this.selectItem = "";
      this.flag = false;
    },

    cancelUpdate(){
      this.listOrders();
      this.clearData();
      
    },
    
    addI() {
      var value = document.getElementById('items').selectedIndex;

      if(value) {

        let id = this.productsArray[value-1].id;
        let valorUnitario = this.productsArray[value-1].valoUnitario;
        let descricao = this.productsArray[value-1].descricao;

        var qntdItem = 0;
        var pos = -1;  
              
        for(let i = 0; i < this.orderAdd.itens.length; i++){
          if(this.orderAdd.itens[i].produto.id == id)
          {
            qntdItem = this.orderAdd.itens[i].quantidade;
            pos = i;
          }
        }

        if(pos != -1)      
          this.orderAdd.itens.splice(pos, 1); 
    
        qntdItem += 1;
        var obj = {"id":value, "produto": {"id": id, "descricao": descricao}, "valor": valorUnitario, "quantidade": qntdItem, "subtotal": (qntdItem*valorUnitario).toFixed(2)};
        var jsonItem = JSON.parse(JSON.stringify(obj));

        this.orderAdd.itens.push(jsonItem);
      }
      else
        this.errors.push("Selecione um Item para Adicionar.");
    },

    removeI(index)
    {
      if(confirm('Deseja excluir o item inteiro?'))      
        this.orderAdd.itens.splice(index, 1); 
    },

    removeQntd(index)
    {
      var qntd = this.orderAdd.itens[index].quantidade;

      if(qntd == 1) 
        this.orderAdd.itens.splice(index, 1); 
      else 
        this.orderAdd.itens[index].quantidade = (qntd-1);
    },
    
    addO()
    {
      this.errors = [];

      var select = document.getElementById('people');

      if(select.selectedIndex > 0 && this.orderAdd.dataEmissao && this.orderAdd.itens.length > 0)
      {

        var id = select.options[select.selectedIndex].value;          
        var nome = select.options[select.selectedIndex].text;

        var obj = {"id":id, "nome": nome};
        var jsonPerson = JSON.parse(JSON.stringify(obj));
        
        this.orderAdd.cliente = jsonPerson;

        this.orderAdd.valorTotal = 0;
        for(let i = 0; i < this.orderAdd.itens.length; i++)      
            this.orderAdd.valorTotal =  (Number(this.orderAdd.valorTotal) + Number(this.orderAdd.itens[i].subtotal)).toFixed(2);           


        if (!this.orderAdd.id) 
          this.addOrder(this.orderAdd);
        else
          this.updateOrder(this.orderAdd);
        
        this.selectClient = "";
        this.selectItem = "";
        this.flag = false; 
      }
      else 
      {
        if (select.selectedIndex  <= 0) 
          this.errors.push("Selecione um cliente.");

        if (!this.orderAdd.dataEmissao) 
          this.errors.push("A Data de Emissão é obrigatória");

        if (this.orderAdd.itens.length == 0)
          this.errors.push("Adicione Itens é obrigatório.");
      }
    },

    updateO(order) {
      this.orderAdd = order;

      this.selectClient = this.orderAdd.cliente.id;
      document.getElementById("items").selectedIndex = 0; 
      this.flag = true;
    },

    removeO(order){
      if(confirm('Deseja excluir o pedido?'))  
      {    
        this.clearData();
        this.removeOrder(order);
        this.listOrders();   
      }
    }
  }
};
</script>

<style>
.title{
  font-weight: bold;
  text-decoration: underline black;
}
</style>
