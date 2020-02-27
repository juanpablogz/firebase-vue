<template>
  <div>
    <form class="form-group">

      <h1>register</h1>
      <div class="form-group">
        <input v-model="nombre" type="text" placeholder="Name" class="form-control"/>
      </div>

      <div class="form-group">
         <input v-model="email" type="email" placeholder="email" class="form-control"/>
      </div>
       
       <div class="form-group"> 
          <input v-model="password" type="password" placeholder="contraseña" class="form-control"/>
       </div>
       
  <div>
    
    <b-button @click="register" value="register" variant="success">Register</b-button>
     <b-button @click="google" value="google" variant="info">signIn google</b-button>
       
  </div>

    </form>
    <br />
    <!-- <pre> {{$data}} </pre> -->
  </div>
</template>

<script>
import firebase from "firebase";
var provider = new firebase.auth.GoogleAuthProvider();

export default {
  data() {
    return {
      nombre: "",
      email: "",
      password: ""
    };
  },
  methods: {
    google() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          user => this.$router.replace("home"),
          error => console.error(error)
        );
    },
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => this.$router.replace("home"),
          error => console.error(error)
        );
    }
  }
};
</script>

<style scoped>
h1 {
   font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: block;
  margin-top: 100px;
}
form > * {
  margin-top: 5px;
  display: block;
}

</style>