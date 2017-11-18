<template>
    <div>
        <modal @closed="closed" :scrollable="true" :min-height="400" :resizable="true" :adaptive="true" name="pupil">
                <div class="grid-x grid-margin-x grid-padding-x">
                    <div class="small-12 cell">
                        <h3>Edit pupil</h3>
                        <label v-for="p in pupil">
                            <input type="text" :value="p" />    
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

Vue.use(VModal)
export default {
    data() {
        return {
            pupil:null,
            id:0
        }
    },
    methods: {
        closed: function() {
            this.$router.go(-1)
        }
    },
    created: function() {
        console.log(this.$route.params.id)
        console.log(this.$modal)
        this.id = this.$route.params.id
        this.$nextTick(() => {
            this.$modal.show("pupil")
        })
        
    },
     apollo: {
        pupil: {
            query:gql`
            query ($id:Int) {
                pupil(id:$id) {
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
            }
        }
    }
}
</script>