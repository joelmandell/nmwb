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
                        <label>Woman:
                            <input type="checkbox" v-model="pupil.woman" />
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
            query: gql`
            {
                pupils {
                    id
                    firstName
                    lastName
                    conducting
                    comments
                    woman
                    tasks {
                        id
		                year
                        week
                        taxanomies {
                            name
                            participant
                        }
		                taxanomyId
                        pupilId
		                lessonId
		                participant
                    }
                }  
            }`   
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
                mutation: gql
                    `mutation 
                        ($id: Int!) {
                            deletePupil(id:$id) {
                                id
                            }
                        }`,
                        // Parameters
                        variables: {
                            id:self.$route.params.id,
                        },
                        update: (store, { data: {deletePupil} }) => {
                            const query = gql `query ($id:Int) {
                                pupil(id:$id) {
                                    id
                                    firstName
                                    lastName
                                    conducting
                                    comments
                                    woman
                                }
                            }
                            `

                            let dat = store.readQuery({query:self.query})
                            dat.pupils = dat.pupils.filter((f) => f.id != self.$route.params.id)

                            store.writeQuery({query:self.query,data:dat})
                        },
                }).then((data) => {
                    console.log("then data")
                    console.log(data)
                   self.$router.go(-1)
                }).catch((error) => {
                    console.error(error)
                })                
            })
            .catch(function () {

            });
        }
    },
    beforeRouteLeave (to, from, next) {
        this.client.mutate({
                mutation: gql`mutation ($pupil: PupilInput) {
                    updatePupil(input:$pupil) {
                        id
                        firstName
                        lastName
                        conducting
                        comments
                        woman
                    }
                }`,
                variables: {
                    pupil: this.pupil,
                },
                update: (store, {data: {updatePupil} }) => {
                    if(updatePupil == null) return
                    const query = gql `query ($id:Int) {
                        pupil(id:$id) {
                            id
                            firstName
                            lastName
                            conducting
                            comments
                            woman
                        }
                    }
                    `
                    const data1 = store.readQuery({
                        query,
                        variables: {
                            id:this.$route.params.id
                        },
                    })
                 
                    data1.pupil = updatePupil

                    store.writeQuery({
                        query,
                        data:data1,
                        variables: {
                            id:this.$route.params.id
                        }
                    })

                    const allPupilsQuery =  gql`
                            {
                                pupils {
                                    id
                                    firstName
                                    lastName
                                    conducting
                                    comments
                                    woman
                                    tasks {
                                        id
                                        year
                                        week
                                        taxanomies {
                                            name
                                            participant
                                        }
                                        taxanomyId
                                        pupilId
                                        lessonId
                                        participant
                                    }
                                }  
                            }`        

                    let allPupils = store.readQuery({
                        query:allPupilsQuery 
                    })

                    allPupils.pupils = allPupils.pupils.map((f,idx) => {
                        if(f.id == updatePupil.id)
                        {
                            f.firstName = updatePupil.firstName
                            f.lastName = updatePupil.lastName
                            f.woman = updatePupil.woman
                            f.comments = updatePupil.comments
                            f.conducting = updatePupil.conducting
                            return f
                        }
                        return f
                    })

                    store.writeQuery({
                        query:allPupilsQuery ,
                        data:allPupils
                    })
                },
                }).then((data) => {
                    // Result
                    next()
                }).catch((error) => {           
                    console.log(error)
                    // We restore the initial user input
                })                
    },
    beforeRouteUpdate (to, from, next) {
        this.client = this.$apollo.provider.defaultClient
        this.$modal.show("pupil")
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
                    woman
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