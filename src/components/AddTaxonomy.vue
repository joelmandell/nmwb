<template>
    <div>
        <modal height="auto" @closed="closed" :scrollable="true" :resizable="true" :adaptive="true" name="taxonomy">
                <div class="grid-x grid-margin-x grid-padding-x">
                    <div v-if="typeof taxonomy != 'undefined'" class="small-12 cell">
                        <br />
                        <h3>Add taxonomy</h3>
                        {{ taxonomy }}
                        <label>
                            {{ $t("label.name") }}:
                            <input type="text" v-model="taxonomy.name" />    
                        </label>
                        
                        <label>
                            Movie:
                            <select v-model="taxonomy.movie">
                                <option value="1">YES</option>
                                <option selected value="0">NO</option>
                            </select>
                        </label>

                        <label>
                            {{ $t("label.participant") }}:
                            <select v-model="taxonomy.participant">
                                <option value="1">YES</option>
                                <option value="0">NO</option>
                            </select>
                        </label>

                        <button class="primary button" @click="add">Add taxonomy</button>
                    </div>
                </div>
        </modal>
    </div>
</template>
<script>
import Vue from 'vue'
import VModal from 'vue-js-modal'
import {cloneDeep} from 'lodash'
import gql from 'graphql-tag'

Vue.use(VModal)
export default {
    data() {
        return {
            taxonomy:{
                name:'',
                participant:0,
                movie:0
            },
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.client = this.$apollo.provider.defaultClient
        this.$modal.show("taxonomy")
        //next()
    },
    created: function() {
        this.client = this.$apollo.provider.defaultClient
        this.$nextTick(() => {
            this.$modal.show("taxonomy")
        })
    },
    methods: {
        closed: function() {
            this.$router.go(-1)
        },
        add() {
            const taxonomy = this.taxonomy
            this.client.mutate({
                mutation: gql`
                    mutation($taxonomy:TaxonomyInput) {
                        addTaxonomy(taxonomy:$taxonomy) {
                            id
                            name
                            participant
                            movie
                        }
                    }
                `,
                variables: {
                    taxonomy
                },
                update: function(store,{data: addTaxonomy})
                {
                    let q = gql`{
                            taxonomies {
                                id
                                name
                                participant
                                movie
                            }
                        }`

                    const data1 = store.readQuery( {query:q })
                    data1.taxonomies.push(addTaxonomy.addTaxonomy)                    
                    store.writeQuery({query:q,data:data1})
                }
            }).then( (data) => {
                this.$modal.hide("taxonomy")
                this.$router.go(-1)
            })
        }
    },
}
</script>