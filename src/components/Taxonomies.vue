<template>
<div>
        <h3>Taxonomies</h3>

        <select>
            <option :value="p.id" :key="p.id" v-for="p in taxonomies">
                {{ p.name }} {{ p.participant ? " (with participant)" : ""}}
            </option>
        </select>
</div>
</template>
<script>
import gql from 'graphql-tag'

export default {
    data() {
        return {
            taxonomies:[]
        }
    },
    apollo: {
        taxonomies: {
            query: gql`
            {
                taxonomies {
                    id
                    name
                    participant
                }
            }`
        }
    }
}

</script>