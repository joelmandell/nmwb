<template>
    <div>
        <router-view></router-view>
        <button class="primary button"><router-link style="color:#fff" to="/pupils/add">Add new</router-link></button>
        <p v-for="p in pupils" >
            <router-link v-show="typeof p.id!='undefined'" :to='"/pupils/edit/"+p.id'>{{ p.firstName }} {{ p.lastName }}</router-link>
        </p>        
    </div>
</template>


<script>
import gql from 'graphql-tag'

export default {
    data() {
        return {
            pupils:[],
        }
    },
    apollo: {
        pupils: {
            query:gql`
            {
                pupils {
                    id
                    firstName
                    lastName
                    conducting
                    comments
                    woman
                }  
            }`        
        }
    }
}
</script>