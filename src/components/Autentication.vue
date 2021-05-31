<template>
  <div>
  <div id="login">
    <h1>Jugetería Otto Klaus</h1>
    <b-form label-width="100px" class="form-login" :model="formLabelAlign">
      <b-input-group class="my-2" append="@">
        <b-form-input  placeholder="Correo electrónico" v-model="formLabelAlign.user" />
      </b-input-group>
      <b-input-group class="mt-2 mb-4">
        <b-form-input type="password" placeholder="Contraseña" v-model="formLabelAlign.password" autocomplete="off" />
      </b-input-group>
      <b-button class="ingresar-login" @click="login($event)" variant="outline-primary">Ingresar</b-button>
    </b-form>
    
  </div>
  
  </div>
</template>

​<script>

import Firebase from 'firebase';
import { AlertPlugin } from 'bootstrap-vue'
import Vue from 'vue'
Vue.use(AlertPlugin)

export default {
    data() {
        return {
            formLabelAlign: {
                            user: '',
                            password: ''
                            }
        }
    },
    methods: {
        login(event) {
          event.preventDefault();
            Firebase.auth().signInWithEmailAndPassword(this.formLabelAlign.user,this.formLabelAlign.password)
            .then(
                accept => this.$router.push('/list'),
                reject => this.$message({
                                            showClose: true,
                                            message: 'Fallo en la autenticación',
                                            type: 'error'
            }));
        }
    },
}
</script>

<style lang="scss" scoped>

@mixin vertical-disposition{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#login {
    
    @include vertical-disposition;
    height: 100vh;

    .form-login{
        @include vertical-disposition;
    
        .ingresar-login{
            width: 100%;
        }

        .auth-element{
            margin: 10px auto;
            height: 30px;
        }
    }
}
</style>