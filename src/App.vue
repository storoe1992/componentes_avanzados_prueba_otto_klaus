<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import firebase from 'firebase'
import Juguete from './classes/Juguete'
import {mapMutations} from 'vuex'

export default {
  name : 'App',
  methods: {
    ...mapMutations(['addJuguete'])
  },
  created(){
    try{
    let db = firebase.firestore();
    db.collection("juguetes").get().then((query) => {
      query.forEach(juguete => {
          const jugueteMapped = new Juguete(juguete.id,juguete.data().name,juguete.data().stock,juguete.data().price);
          this.addJuguete(jugueteMapped);
      });
    });
    }catch(error){
      alert("Error cargando base de datos firebase")
    }
  }
}
</script>


<style lang="scss">

</style>
