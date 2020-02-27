<template>
  <div>

    <form class="form-group">

          <h1>login</h1>
      <div class="form-group">
        <input  class="form-control"  v-model="email" type="text" placeholder="usuario"/>
      </div>
      <div class="form-group">
        <input  class="form-control" v-model="password" type="password" placeholder="contraseña" />
      </div>
      <input class="btn btn-info btn-block" @click="login" type="submit" value="acceder" />
      <input class="btn btn-info btn-block" @click="google" type="button" value="google" />
    </form>

    <pre> {{$data}} </pre>
  </div>
</template>

<script>
import firebase from "firebase";
var provider = new firebase.auth.GoogleAuthProvider();
export default {
  data() {
    return {
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
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
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