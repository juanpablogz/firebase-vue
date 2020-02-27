<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to>Inicio</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="usuario == null">
          <b-nav-item to="/register">registrar</b-nav-item>
          <b-nav-item to="/login">Iniciar sesion</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="usuario != null">
          <b-nav-item to="/home">Notes</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content v-if="usuario != null">
            <em v-if="usuario.displayName ">{{usuario.displayName}}</em>
            <em v-else-if="usuario.displayName == null">{{usuario.email}}</em>
          </template>
          <b-dropdown-item @click="logout">log out</b-dropdown-item>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <router-view />
  </div>
</template>


<script>
// app.js

import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import firebase from "firebase";

export default {
  data() {
    return {
      name: "App",
       usuario: firebase.auth().currentUser
    };
  },
  methods: {
 logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.replace("login"));
    },
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;

}
</style>
