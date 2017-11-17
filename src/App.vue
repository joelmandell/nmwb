<template>
  <div id="app">
    <div class="grid-container full">
      <div class="top-bar" id="topBar">
          <div class="top-bar-left">
            <ul class="dropdown menu" data-dropdown-menu>
              <li><router-link class="menu-text" to="/">MWB</router-link></li>
              
                <li v-show="getToken != null">
                  <a href="#">Pupils</a>
                  <ul class="menu vertical">
                    <li><a href="#">One</a></li>
                    <li><a href="#">Two</a></li>
                    <li><a href="#">Three</a></li>
                  </ul>
                </li>
                <li v-show="getToken != null"><router-link to="/login">Sign out</router-link></li>
              
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
          <div class="small-12 cell">
            <br />
          </div>
        </div>
      </div>
      <div class="grid-container">
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

  mounted: function() {

  },
  created: function() {
    
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
