<template>
  <div id="app">
    <div class="top-bar">
      <div class="top-bar-left">
        <ul class="dropdown menu" data-dropdown-menu>
          <li class="menu-text">Site Title</li>
          <li>
            <a href="#">One</a>
            <ul class="menu vertical">
              <li><a href="#">One</a></li>
              <li><a href="#">Two</a></li>
              <li><a href="#">Three</a></li>
            </ul>
          </li>
          <li><a href="#">Two</a></li>
          <li><a href="#">Three</a></li>
        </ul>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li><input type="search" placeholder="Search"></li>
          <li><button type="button" class="button">Search</button></li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="columns small-12">
        <h1>{{ msg }}</h1>
        <p>
          This will be the interface for communicating with the API.
        </p>
        <login v-if="getToken == null"></login>
        <p v-else><button @click="signout()">Sign out</button></p>
      </div>
    </div>
  </div>
</template>

<script>
import login from './components/Login'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import $ from 'jquery'

import { Foundation } from 'foundation-sites/js/foundation.core';
import { Dropdown } from 'foundation-sites/js/foundation.dropdown';
import { Box } from 'foundation-sites/js/foundation.util.box';
import { Triggers } from 'foundation-sites/js/foundation.util.triggers';



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
  mounted: function() {
Foundation.addToJquery($)
Foundation.Dropdown = Dropdown
Triggers.init($, Foundation);
Foundation.plugin(Dropdown, 'Dropdown');
  },
  created: function() {
    console.log(Foundation)
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
