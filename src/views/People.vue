<template>
  <div id="People">
    <Navigation></Navigation>

    <div class="container">
      <ul>
        <li v-for="(error, index) of errors" :key="index">
          <div class="card-panel">
            <span class="red-text text-darken-2">*{{error}}</span>
          </div>
        </li>
      </ul>

      <h5 class="title">Cadastro de Pessoas</h5>

      <form>
        <label>Nome</label>
        <input type="text" placeholder="Informe o Nome" v-model="personAdd.nome" />
        <label>CPF</label>
        <input type="text" onkeyup="this.value=this.value.replace(/[^\d]/,'')" placeholder="Informe o CPF" v-model="personAdd.cpf"/>
        <label>Data de Nascimento</label>
        <input type="date" placeholder="Informe a Data de Nacimento" v-model="personAdd.dataNascimento" />        

        <div class="row">
          <div class="col s12 m6 l2">
            <p>
            <button @click="add()" class="waves-effect waves-light btn-small brown lighten-2">
              Salvar
              <i class="material-icons left">save</i>
            </button>
            </p>
          </div>
          <div class="col s12 m6 l2">
            <p>
            <button @click="cancelUpdate()" class="waves-effect waves-light btn-small  orange darken-11" v-if="flag">
              Cancelar
              <i class="material-icons left">cancel</i>
            </button>  
            </p>
          </div>
        </div> 
      </form>
      <br />
      <h5 class="title">Lista de Pessoas</h5>

      <table class="responsive-table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>CPF</th>
            <th>DATA DE NASCIMENTO</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="person of peopleArray" :key="person.id">
            <td>{{person.nome}}</td>
            <td>{{person.cpf}}</td>
            <td>{{person.dataNascimento}}</td>
            <td>
              <button @click="update(person)" class="waves-effect btn-small grey darken-1">
                <i class="material-icons">create</i>
              </button>
              <button @click="remove(person)" class="waves-effect btn-small red darken-1">
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
  name: "People",
  components: {
      'Navigation': Navigation
  },  

  data() {
    return {
      personAdd: {
        id: "",
        nome: "",
        cpf: "",
        dataNascimento: ""
      },
      flag: false,
      errors: []
    };
  },  

  mounted() {
    this.listPeople();
  },

  computed: {
    ...mapState(['peopleArray'])
  },

  methods: {
    ...mapActions(['addPerson', 'updatePerson', 'removePerson', 'listPeople']),

    clearData()
    {
      this.errors = [];
      this.personAdd = {};
      this.flag = false;
    },

    cancelUpdate(){
      this.clearData();
      this.listPeople();
    },

    add() {
      this.errors = [];

      if (this.personAdd.nome && this.personAdd.cpf && this.personAdd.cpf.length == 11 && this.personAdd.dataNascimento) 
      {
        if (!this.personAdd.id) 
          this.addPerson(this.personAdd);
        else
          this.updatePerson(this.personAdd);

        this.clearData();
      } else {
        if (!this.personAdd.nome) 
          this.errors.push("O nome é obrigatório.");

        if (!this.personAdd.cpf) 
          this.errors.push("O CPF é obrigatório");

        if (this.personAdd.cpf.length != 11)
          this.errors.push("Informe o número correto de digitos para o CPF.");

        if (!this.personAdd.dataNascimento)
          this.errors.push("A Data de Nascimento é obrigatória.");
      }
    },   

    update(person) {
      this.clearData();
      this.personAdd = person;
      this.flag = true;
    },

    remove(person) {

      if (confirm("Deseja excluir a pessoa?"))
      {
        this.clearData();
        this.removePerson(person);
        this.listPeople();        
      }
    }
  }
};
</script>

<style>
.title {
  font-weight: bold;
  text-decoration: underline black;
}
</style>
