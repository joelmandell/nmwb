<template>
    <div>
        <modal height="auto" @closed="closed" :scrollable="true" :resizable="true" :adaptive="true" name="pupil">
                <div class="grid-x grid-margin-x grid-padding-x">
                    <div v-if="typeof pupil != 'undefined'" class="small-12 cell">
                        <br />
                        <h3>Edit pupil</h3>
                        <label>
                            Firstname:
                            <input type="text" v-model="pupil.firstName" />    
                        </label>
                        <label>
                            Lastname:
                            <input type="text" v-model="pupil.lastName" />    
                        </label>
                        <label>
                            Conducting:
                            <select v-model="pupil.conducting">
                                <option value="1">YES</option>
                                <option value="0">NO</option>
                            </select>
                        </label>
                        <label>
                            Comments:
                            <textarea v-model="pupil.comments">    

                            </textarea>
                        </label>
                    </div>
                </div>
        </modal>
    </div>
</template>
<script>
import Vue from 'vue'
import VModal from 'vue-js-modal'
import gql from 'graphql-tag'
import {cloneDeep} from 'lodash'

Vue.use(VModal)
export default {
    data() {
        return {
            pupil:[],
            id:0,
            client:null
        }
    },
    methods: {
        closed: function() {
            this.$router.go(-1)
        }
    },
    beforeRouteLeave (to, from, next) {
        delete this.pupil["__typename"]

        this.client.mutate({
                mutation: gql`mutation ($pupil: PupilInput) {
                    updatePupil(input:$pupil) {
                        id
                        firstName
                        lastName
                        conducting
                        comments
                    }
                }`,
                // Parameters
                variables: {
                    pupil: this.pupil,
                },
                update: (store, { data }) => {
                    console.log(data)
                },
                optimisticResponse: {

                },
                }).then((data) => {
                    // Result
                    next()
                }).catch((error) => {
                    console.log("FEL")
                    console.error(error)
                    // We restore the initial user input
        })                
    },
    beforeRouteUpdate (to, from, next) {
        this.client = this.$apollo.provider.defaultClient
        this.$modal.show("pupil")
        //next()
    },
    created: function() {
        this.client = this.$apollo.provider.defaultClient
        this.$nextTick(() => {
            this.$modal.show("pupil")
        })
    },
    apollo: {
        pupil: {
            query:gql`
            query ($id:Int) {
                pupil(id:$id) {
                    id
                    firstName
                    lastName
                    conducting
                    comments
                }  
            }`,
            variables() {
                return {
                    id:this.$route.params.id
                }
            },
            result({ data, loader, networkStatus }) {
                this.pupil = cloneDeep(data.pupil)
            }
        }
    }
}
</script>