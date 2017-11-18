<template>
    <div>
        <router-link v-for="p in pupils" :to='"/pupils/"+p.id'>
            <p>{{ p.firstName }} {{ p.lastName }}</p>
        </router-link>
        <router-view></router-view>
    </div>
</template>


<script>
import gql from 'graphql-tag'

export default {
    data() {
        return {
            pupils:null,
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
                }  
            }`        
        }
    }
}
</script>