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
import Settings from './components/Settings.vue'
import Pupils from './components/Pupils.vue'
import Pupil from './components/Pupil.vue'
import AddPupil from './components/AddPupil.vue'
import Taxonomies from './components/Taxonomies.vue'
import AddTaxonomy from './components/AddTaxonomy.vue'
import {mapActions} from 'vuex'
import langs from './langs/'
import VuejsDialog from "vuejs-dialog"

const i18n = langs.i18n

Vue.use(VuejsDialog)
Vue.use(VueRouter)

const routes = [
  { path: '/',  component: { template: "<div><h1>Living as Christians</h1><p>Here you can administrate the schedules.</p></div>"}},
  { path: '/login', component: Login },
  { path: '/settings', component: Settings },
  { path: '/taxonomies', component: Taxonomies,
    children: [
      { path: 'add', component: AddTaxonomy }
    ]
  },
  { path: '/pupils', component: Pupils,
    children: [
      { path: 'edit/:id', component: Pupil },
      { path: 'add', component: AddPupil }
    ]
  }
]

const router = new VueRouter({
    routes,
})

window.$ = $

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://192.168.0.100:4000/graphql/',
  headers: {
    authorization:"Bearer " + store._wrappedGetters.getToken(store)
  }
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false
  }),
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

/*
 */

const app = new Vue({
  el:"#app",
  apolloProvider,
  router,
  store,
  i18n,
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
