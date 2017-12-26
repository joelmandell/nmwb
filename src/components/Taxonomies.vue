<template>
    <div>
        <router-view></router-view>
        <h3>Taxonomies</h3>

        <select>
            <option :value="p.id" :key="p.id" v-for="p in taxonomies">
                {{ p.name }} {{ p.participant ? " (with participant)" : ""}}
            </option>
        </select>

        <button @click="add" class="primary button">Add taxonomy</button>
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
    methods: {
        add: function() {
            this.$router.push("/taxonomies/add")
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