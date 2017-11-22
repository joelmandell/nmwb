<template>
    <div>
        <modal height="auto" @closed="closed" :scrollable="true" :resizable="true" :adaptive="true" name="pupil">
                <div class="grid-x grid-margin-x grid-padding-x">
                    <div v-if="typeof pupil != 'undefined'" class="small-12 cell">
                        <br />
                        <h3>Edit pupil</h3>
                        <p><strong>{{ $t("message.saved_automatically") }}</strong></p>
                        <label>
                            {{ $t("label.firstName") }}:
                            <input type="text" v-model="pupil.firstName" />    
                        </label>
                        <label>
                            {{ $t("label.lastName") }}:
                            <input type="text" v-model="pupil.lastName" />    
                        </label>
                        <label>
                            {{ $t("label.conducting") }}:
                            <select v-model="pupil.conducting">
                                <option value="1">YES</option>
                                <option value="0">NO</option>
                            </select>
                        </label>
                        <label>
                            {{ $t("label.comments") }}:
                            <textarea rows="7" v-model="pupil.comments">    

                            </textarea>
                        </label>
                        <button @click="remove" class="button alert">Delete</button>
                        <p><strong>{{ $t("message.saved_automatically") }}</strong></p>
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
            client:null,
                query:gql`
            query {
                pupils {
                    id
                    firstName
                    lastName
                    conducting
                    comments
                }  
            }`,
        }
    },
    methods: {
        closed: function() {
            this.$router.push("/pupils")
        },
        remove: function() {
            let self = this

            this.$dialog.confirm('Please confirm to continue')
            .then(function () {               
                self.client.mutate({
                mutation: gql`mutation ($id: Int!) {
                                    deletePupil(id:$id) {
                                        id
                                    }
                                }`,
                                // Parameters
                                variables: {
                                    id:self.$route.params.id,
                                },
                                update: (store, { data: {deletePupil} }) => {
                                    let dat = store.readQuery({query:self.query})

                                    console.log(self.$route.params.id)
                                    if(typeof deletePupil == 'undefined') return

                                    // const index = dat.pupils.findIndex( (f) => f.id == self.$route.params.id)
                                    // console.log(index)
                                    // let ne = null
                                    // if(index > -1)
                                    // {
                                    //     dat.pupils = dat.pupils.splice(index,1)
                                    // }

                                    store.writeQuery({query:self.query,data:dat.pupils.filter((f) => f.id != self.$route.params.id)})
                                },
                                optimisticResponse: {

                            },
                }).then((data) => {
                    // Result
                    console.log("IN THEN DATA")
                    //self.modal.$hide("pupil")
                   self.$router.go(-1)
                   window.location.refresh()
                }).catch((error) => {
                    console.error(error)
                })                
            })
            .catch(function () {
                console.log('Clicked on cancel')
            });
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
                update: (store, { data: {updatePupil} }) => {
                    let dat = store.readQuery({query:this.query})

                    if(typeof updatePupil == 'undefined') return
                    dat.pupils = dat.pupils.map( (f) => {
                        if(f.id == updatePupil.id)    
                        {
                            
                            f = updatePupil
                        }
                        return f
                    })
                    store.writeQuery({query:this.query,data:dat})
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