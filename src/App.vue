<template>
  <div id="app">
    <div class="grid-container full">
      <div class="top-bar" id="topBar">
          <div class="top-bar-left">
            <ul class="dropdown menu" data-dropdown-menu>
              <li><router-link class="menu-text" to="/">MWB</router-link></li>
                <li v-show="getToken != null">
                  <router-link to="/pupils"> {{ $t("menu.pupils") }}</router-link>
                </li>
                <li v-show="getToken != null">
                  <router-link to="/settings">
                    {{ $t("menu.settings") }}
                  </router-link>
                </li>
                <li v-show="getToken != null"><router-link to="/" @click.native="signout">Sign out</router-link></li>
                <li v-show="getToken == null"><router-link to="/signin">Sign in</router-link></li>

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
      <div class="grid-container" >
        <div class="grid-x">
          <div class="small-12 cell">
            <br />
          </div>
        </div>
      </div>
      <div class="grid-x grid-margin-x grid-padding-x">
        <div class="small-12 cell">
          <router-view></router-view>
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
    ...mapActions(
      ["signout"]
    ),
    authed: function()
    {
      if(this.getToken == null)
      {
        this.$router.push("/login")
      } else {
      }
    }
  },
  watch: {
    '$route': 'authed'
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
