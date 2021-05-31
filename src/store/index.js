import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    juguetes : []
  },
  getters: {
    getJugueteById: (state) => (id) => {
      return state.juguetes.find(juguete => juguete.id === id);
    }
  },
  mutations: {
    addJuguete(state,juguete){
      state.juguetes.push(juguete);
    },
    deleteJuguete(state,id){
      try{
      let index = state.juguetes.findIndex( juguete => juguete.id === id );
      state.juguetes.splice(index,1);
      }catch(error){
        console.log(error)
      }
    },
    updateJuguete(state,jugueteToUpdate){
      try{
        let juguete = state.juguetes.find( juguete => juguete.id === jugueteToUpdate.id );
        juguete.update(jugueteToUpdate);
        }catch(error){
          console.log(error)
        }
    }
  },
  actions: {
    async deleteJuguete({commit},id){
      try{
        let db = firebase.firestore();
        await db.collection('juguetes').doc(id).delete();
        commit('deleteJuguete',id);
      }catch(error){
        console.log(error)
      }
    },
    async addJuguete({commit},jugueteToAdd){
      try{
        let db = firebase.firestore();
        const docRef = await db.collection("juguetes").add(JSON.parse( JSON.stringify(jugueteToAdd)));
        jugueteToAdd.id= docRef.id;
        commit('addJuguete',jugueteToAdd);
      }catch(error){
        console.log(error);
      }
    },
    async updateJuguete({commit},jugueteToUpdate){
      try{
        let db = firebase.firestore();
        const docRef = await db.collection("juguetes").doc(jugueteToUpdate.id).set(JSON.parse( JSON.stringify(jugueteToUpdate)));
        commit('updateJuguete',jugueteToUpdate);
      }catch(error){
        console.log(error);
      }
    }
  },
  modules: {
  }
})
