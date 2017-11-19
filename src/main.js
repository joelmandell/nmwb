import Vue from 'vue'
import App from './App.vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import store from './store'
import $ from 'jquery'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Pupils from './components/Pupils.vue'
import Pupil from './components/Pupil.vue'
import {mapActions} from 'vuex'

Vue.use(VueRouter)

const routes = [
  { path: '/',  component: { template: "<h1>TEST</h1>"}},
  { path: '/login', component: Login },
  { path: '/pupils', component: Pupils,
    children: [
      { path: '/pupils/:id', component: Pupil },
    ]
  }
]

const router = new VueRouter({
    routes,
})

window.$ = $

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql/',
  headers: {
    authorization:"Bearer " + store._wrappedGetters.getToken(store)
  }
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/*
 */

const app = new Vue({
  el:"#app",
  apolloProvider,
  router,
  store,
  methods: {
    ...mapActions([
      "getToken"
    ])
  },
  created: function() {
    let self = this
    
    if(self.getToken == null) {
      self.$router.push("login")
    }  
    $(document).ready( function() {
      $(document).foundation()    
        
    })
  },
  render: h => h(App)  
})
