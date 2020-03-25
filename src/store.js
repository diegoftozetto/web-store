import Vue from 'vue'
import Vuex from 'vuex'

import People from "./services/people";
import Products from "./services/products"
import Orders from "./services/orders";

Vue.use(Vuex)

const state = { 
    peopleArray: [],
    productsArray: [],
    ordersArray: [],
}

const actions = {
    addPerson({ commit }, person) {
        commit('addPerson', person);
    },

    updatePerson({ commit }, person) {        
        commit('updatePerson', person);
    },

    removePerson({commit}, person){
        commit('removePerson', person);
    },

    listPeople({commit}){
        return new Promise(() =>{
            setTimeout(() => {
                commit('listPeople');
            }, 200);
        });        
    },

    listProducts({commit}){
        return new Promise(() => {
            setTimeout(() =>{
                commit('listProducts');
            }, 200);
        })
    },

    addOrder({commit}, order){
        commit('addOrder', order);
    },

    updateOrder({commit}, order){
        commit('updateOrder', order);
    },    

    removeOrder({commit}, order){
        commit('removeOrder', order);
    },    

    listOrders({commit}){
        commit('listOrders');
                
    }
}

const mutations = {
    addPerson(state, payload) {
        console.log(payload);

        People.save(payload).then(answer => {
            console.log(answer.data);
            alert("Cadastro realizado com sucesso!");

            People.list().then(answer => {
                state.peopleArray = answer.data;
                state.peopleArray.reverse();
            });
        });
    },

    updatePerson(state, payload) {
        console.log(payload);

        People.update(payload).then(answer => {
            console.log(answer.data);
            alert("Atualizacao realizada com sucesso!");

            People.list().then(answer => {
                state.peopleArray = answer.data;
                state.peopleArray.reverse();
            });
        });
    },

    removePerson(state, payload) {
        People.delete(payload).then(answer => {
            console.log(answer.data);            
        })
    },

    listPeople() {
        People.list().then(answer => {
            state.peopleArray = answer.data;
            state.peopleArray.reverse();
        });
    },

    listProducts(){
        Products.list().then(answer => {
            state.productsArray = answer.data;
        });
    },

    addOrder(state, payload){
        Orders.save(payload).then(() => {
            alert("Cadastro realizado com sucesso!");  

            Orders.list().then(answer => {
                state.ordersArray = answer.data;
                state.ordersArray.reverse();
            });

            payload.id = "";
            payload.dataEmissao = "";
            payload.cliente = {};
            payload.valor = 0;
            payload.itens = [];
        })     
    },

    updateOrder(state, payload){
        Orders.update(payload).then(() => {
            alert("Atualização realizada com sucesso!");         
            
            Orders.list().then(answer => {
                state.ordersArray = answer.data;
                state.ordersArray.reverse();
            });

            payload.id = "";
            payload.dataEmissao = "";
            payload.cliente = {};
            payload.valor = 0;
            payload.itens = [];
        });
    },

    removeOrder(state, payload){
        Orders.delete(payload).then(answer=>{
            console.log(answer.data);           
        });
    },

    listOrders(){
        Orders.list().then(answer => {
            state.ordersArray = answer.data;
            state.ordersArray.reverse();

            console.log("Lista obtida");
        });
    }
}

export default new Vuex.Store({ state, actions, mutations })