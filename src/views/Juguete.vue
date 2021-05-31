<template>
  <b-container class="juguete mt-5">
      <h2 class="h2">Juguete</h2>
      <b-form-input v-model="name" placeholder="Nombre"/>
      <b-form-input type="number" min="0" v-model="stock" placeholder="Stock"/>
      <b-form-input type="number" min="0" v-model="price" placeholder="Precio"/>
      <b-button @click="add" v-if="buttonAction" variant="success">Agregar</b-button>
      <b-button @click="update" v-if="!buttonAction" variant="primary">Modificar</b-button>
  </b-container>
</template>

<script>
import {mapActions} from 'vuex'
import Juguete from '../classes/Juguete'
import { MessageBox } from 'element-ui'
export default {
  name: 'Juguete',
  props: {
    jugueteid : {
      type: String,
      require: false,
      default: ''
    }
  },
  data() {
    return {
      name: '',
      stock: '',
      price: ''
    }
  },
  methods: {
    ...mapActions(['addJuguete','updateJuguete']),
    add(){
      MessageBox.confirm("¿ Quieres agregar el juguete ?","Confirmation",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          type: "warning"
        }).then(() => {
        
          try{
            this.validateData();
            let jugueteToAdd = new Juguete(null,this.name,this.stock,this.price);
            this.addJuguete(jugueteToAdd);
            this.$message({ type: 'info', message: "Juguete agregado"}); 
          }catch(error){
            console.log(error);
          }

        }).catch((error)=>{
          this.$message({ type: 'info', message: "Eliminación cancelada"}); 
        })
      
    },
    update(){
      MessageBox.confirm("¿ Quieres actualizar el juguete ?","Confirmation",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          type: "warning"
        }).then(()=> {
            try{
                  this.validateData();
                  let jugueteToUpdate = new Juguete(this.jugueteid,this.name,this.stock,this.price);
                  this.updateJuguete(jugueteToUpdate);
                  this.$message({ type: 'info', message: "Actualización completada"}); 
                }catch(error){
                  console.log(error);
                }
        } ).catch(()=>{
          this.$message({ type: 'info', message: "Actualización cancelada"}); 
        })
      
    },
    validateData(){
        if(this.name.trim() === '')
            throw 'Debe especificar todos los datos'
    }
  },
  beforeRouteEnter(to,from,next){
    next( vm => {
      let jugueteid = vm._props.jugueteid;
      if(jugueteid!=""){
        try{
        let juqueteToUpdate = vm.$store.getters.getJugueteById(jugueteid);
        if(juqueteToUpdate){
          vm.name = juqueteToUpdate.name;
          vm.stock = juqueteToUpdate.stock;
          vm.price = juqueteToUpdate.price;
        }
        }catch(error){
          alert(error)
        }
      }
    });
  },
  computed: {
    buttonAction() {
      return this.jugueteid === '';
    }
  },

}
</script>


<style lang='scss' scoped>
.juguete{
  display: flex;
  align-items: center;
  justify-content: center;

  h2,input {
    margin-right: 10px;
  }

  
}
</style>

