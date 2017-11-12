<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <p>
      This will be the interface for communicating with the API.
    </p>
    <login v-if="getToken == null"></login>
    <p v-else><button @click="signout()">Sign out</button></p>
  </div>
</template>

<script>
import login from './components/Login'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

export default {
  name: 'app',
  components: {
    login,
  },
  computed: {
    ...mapGetters([
      "getToken"
    ])
  },
  methods: {
    ...mapActions([
      "signout"
    ])
  },
  created: function() {
    console.log(this.$apollo)
  },
  data () {
    return {
      msg: 'Welcome to MWB'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
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
