<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a href @click="logout">Logout</a>
    <form id="formulario" @submit.prevent="enviarMensaje">
      <textarea v-model="mensaje" name="mensaje" id="mensaje" cols="30" rows="10"></textarea>
      <br />
      <input type="submit" value="Enviar mensaje" />
    </form>
    <hr />
  
    <h1>Bienvenido</h1>
    <h2>{{authUser.uid}}</h2>

    <h3>{{this.uid}}</h3>
    <h1></h1>
    <ul v-if="authUser.uid == this.uid">
      <li v-for="(MS, idx) in message" :key="idx">
        <span
          contenteditable="true"
          @blur="editarMensaje($event, MS.key)"
          v-if="MS.authUser == authUser.uid"
        >{{MS.mensaje}}</span>
        <small>
          <!-- {{idx}} -->
        </small>
        <button v-if="MS.authUser == authUser.uid" @click="eliminarMensaje(MS.key)">X</button>
      </li>
    </ul>

    <div class="container mt-5 pt-5" v-if="authUser.uid == this.uid">
      <b-card-group deck v-for="(MS, idx) in message" :key="idx">
        <b-card
        class="row"
          title="Title"
          img-src="https://picsum.photos/300/300/?image=41"
          img-alt="Image"
          img-top
         
        >
          <b-card-text
            contenteditable="true"
            @blur="editarMensaje($event, MS.key)"
            v-if="MS.authUser == authUser.uid"
          >{{MS.mensaje}}</b-card-text>
          <button v-if="MS.authUser == authUser.uid" @click="eliminarMensaje(MS.key)">X</button>
          <template v-slot:footer>
            <small class="text-muted">Last updated 3 mins ago</small>
          </template>
        </b-card>

        <b-card
          title="Title"
          img-src="https://picsum.photos/300/300/?image=41"
          img-alt="Image"
          img-top
        >
          <b-card-text>This card has supporting text below as a natural lead-in to additional content.</b-card-text>
          <template v-slot:footer>
            <small class="text-muted">Last updated 3 mins ago</small>
          </template>
        </b-card>

        <b-card
          title="Title"
          img-src="https://picsum.photos/300/300/?image=41"
          img-alt="Image"
          img-top
        >
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This card has even longer content than the first to show that equal height action.
          </b-card-text>
          <template v-slot:footer>
            <small class="text-muted">Last updated 3 mins ago</small>
          </template>
        </b-card>
      </b-card-group>
    </div>


    
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "home",

  data() {
    return {
      msg: "Welcome to Your Vue.js App + firebase",
      mensaje: null,
      message: [],
      authUser: false,
      userConect: null,
      uid: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.replace("login"));
    },
    // agregarUserDB(uid, email) {
    //   var conectados = this.userConect.push({
    //     uid:uid,
    //     email:email
    //   });
    // },
    enviarMensaje(mensaje, user) {
      db.ref("/chats")
        .push({
          mensaje: this.mensaje,
          authUser: this.authUser.uid
        })
        .then(data => {
          this.mensaje = "";
          // console.log("esta es mi key"+ data.key);
          // llamando a la data podemos acceder a la key
        });
    },
    editarMensaje(mensaje, key) {
      // console.log(mensaje.target.innerHTML, key);
      db.ref("/chats/" + key).update({
        mensaje: mensaje.target.innerHTML
      });
    },
    eliminarMensaje(key) {
      // console.log(key);
      if (confirm("seguro?")) {
        db.ref("/chats/" + key).remove();
      }
    },
    cargarMensajes(message) {
      // console.log(message);
      this.message = [];
      for (let key in message) {
        this.message.push({
          mensaje: message[key].mensaje,
          authUser: message[key].authUser,
          key: key
        });
      }
      this.message.reverse();
    }
  },
  created() {
    // trae los elementos cada vez que hay un cambio
    // con .once se ejecuta solo una vez al inicio
    db.ref("/chats").on(
      "value",
      snapshot => this.cargarMensajes(snapshot.val()),

      // recibe el correo y lo muestra en el h2
      firebase.auth().onAuthStateChanged(user => {
        //  console.log(user.uid)
        this.authUser = user;
        this.uid = user.uid;

        //   this.userConect = db.ref("/usuario");
        // this.agregarUserDB(user.uid, user.email);
      })
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
