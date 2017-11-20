<template>
    <div>
        <modal height="auto" @closed="closed" :scrollable="true" :resizable="true" :adaptive="true" name="pupil">
                <div class="grid-x grid-margin-x grid-padding-x">
                    <div v-if="typeof pupil != 'undefined'" class="small-12 cell">
                        <br />
                        <h3>Add pupil</h3>
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

                        <button class="primary button" @click="add">Add pupil</button>
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
            pupil:{
                firstName:'',
                lastName:'',
                conducting:0,
                comments:'',
            },
            query: gql`
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
    methods: {
        closed: function() {
            this.$router.go(-1)
        },
        add() {
            const pupil = this.pupil

            this.client.mutate({
                mutation: gql`
                    mutation($pupil:PupilInput) {
                        addPupil(pupil:$pupil) {
                            id
                            firstName
                            lastName
                            conducting
                            comments
                        }
                    }
                `,
                variables: {
                    pupil:this.pupil
                },
                update: (store, {data: {addPupil}}) => {
                    const dat = store.readQuery({query:this.query})
                    dat.pupils.push(addPupil)
                    store.writeQuery({query:this.query,data:dat})
                }
            }).then( (data) => {
                this.$modal.hide("pupil")
                this.$router.go(-1)
            })
        }
    },
}
</script>