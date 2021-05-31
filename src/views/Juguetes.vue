<template>
  <section class="home">
    <b-container>
    <h1>Lista de juguetes</h1>
    <b-table small responsive="sm" :items="juguetes" :fields="[{key:'name',label:'Nombre'},{key:'stock',label:'Stock'},{key:'price',label:'Precio'},{key:'update',label:''},{key:'delete',label:''}]">
        <template #cell(update)="data">
            <b-button variant="primary" @click="updateJuguete(data.item.id)">Modificar</b-button>
        </template>
        <template #cell(delete)="data">
            <b-button variant="danger" @click="deleteJ(data.item.id)">Eliminar</b-button>
        </template>
    </b-table>
    </b-container>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {MessageBox} from 'element-ui'
export default {
  name: 'Juguetes',
  methods: {
    ...mapActions(['deleteJuguete']),
    deleteJ(id){
        MessageBox.confirm("¿ Quieres eliminar el juguete ?","Confirmation",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          type: "warning"
        }).then(()=>{
            this.deleteJuguete(id);
            this.$message({ type: 'info', message: "Juguete eliminado"}); 
        }).catch(() => this.$message({ type: 'info', message: "Eliminación cancelada"}) );
    },
    updateJuguete(id){
      this.$router.push(`/juguete/${id}`);
    }
  },
  computed: {
    ...mapState(['juguetes'])
  },
}
</script>

<style lang="scss" scoped>
table{

   width: 100%;
  
   th, td {
      border: 1px solid black;
   }
}
</style>
