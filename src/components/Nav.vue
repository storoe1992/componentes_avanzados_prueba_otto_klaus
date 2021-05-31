<template>
    <div>
        <b-container>
            <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-container>
            <b-navbar-brand>Otto Klaus</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                <b-nav-item><router-link to="/list">Lista de juguetes</router-link></b-nav-item>
                <b-nav-item><router-link to="/juguete">Agregar juguete</router-link></b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav>
                    <b-nav-item @click="logout">Salir</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
            </b-container>
            </b-navbar>
        </b-container>
    </div>
</template>

<script>

import Firebase from 'firebase'


export default {
  name: 'Home',
  methods: {
    logout() {
      Firebase.auth().signOut().then(() => {
          this.$router.push('/login')
      }).catch((error) => {
          alert("Ocurrió un error mientras se deslogueaba: " + error)
      });
      
    }
  },
}
</script>

<style lang="scss" scoped>
a {
    font-weight: bold;
    color: white;
    text-decoration: none;

    &.router-link-active {
      color: #42b983;
    }
  }
</style>
