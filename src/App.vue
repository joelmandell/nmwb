<template>
  <div id="app">
    <div class="grid-container full">
      <div class="top-bar" id="topBar">
          <div class="top-bar-left">
            <ul class="dropdown menu" data-dropdown-menu>
              <li class="menu-text">MWB</li>
              <li v-show="getToken != null">
                <a href="#">Pupils</a>
                <ul class="menu vertical">
                  <li><a href="#">One</a></li>
                  <li><a href="#">Two</a></li>
                  <li><a href="#">Three</a></li>
                </ul>
              </li>
              <li><a href="#">Two</a></li>
            </ul>
          </div>
          <div class="top-bar-right">
            <ul class="menu" v-if="getToken != null">
              <li><input type="search" placeholder="Search"></li>
              <li><button type="button" class="button">Search</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grid-container">
        <div class="grid-x">
          <div class="small-6 cell">
            <h1>{{ msg }}</h1>
            <p>
              This will be the interface for communicating with the API.
            </p>
          </div>
          <div class="small-6 cell"></div>
        </div>
        <div class="grid-x">
          <div class="small-12 cell">
            <router-view></router-view>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import foundation from 'foundation-sites'

export default {
  name: 'app',
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
  mounted: function() {
    if(this.getToken == null) {
      this.$router.push("login")
    }
  },
  created: function() {
    $(document).ready( function() {
$("#topBar").foundation()    })
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
  color: #2c3e50;
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
