import Vue from 'vue'
import App from './App.vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import store from './store'
import $ from 'jquery'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{ path: '/',  component: { template: "<h1>TEST</h1>"}},
]

const router = new VueRouter({
    routes,
})

window.$ = $

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql/',
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

const app = new Vue({
  el:"#app",
  apolloProvider,
  router,
  store,
  render: h => h(App)  
})
