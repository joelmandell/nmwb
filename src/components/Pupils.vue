<template>
    <div>
        <p v-for="p in pupils">{{ p.firstName }}</p>
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