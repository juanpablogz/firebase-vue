// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from "firebase/app";

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCiLS4vedUAm6D4xdudb7MKdPYOjz-fdwk",
  authDomain: "app1-dff3d.firebaseapp.com",
  databaseURL: "https://app1-dff3d.firebaseio.com",
  projectId: "app1-dff3d",
  storageBucket: "app1-dff3d.appspot.com",
  messagingSenderId: "830217152527",
  appId: "1:830217152527:web:76efd1a5ebe85a44f81b7a",
  measurementId: "G-S34P1EXXRF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
firebase.auth().onAuthStateChanged(function(user){

      
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })

});

