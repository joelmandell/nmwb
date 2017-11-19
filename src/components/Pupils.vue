<template>
    <div>
        <router-view></router-view>
        <p v-for="p in pupils" >
            <router-link :to='"/pupils/"+p.id'>{{ p.firstName }} {{ p.lastName }}</router-link>
        </p>        
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