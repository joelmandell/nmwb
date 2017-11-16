<template>
    <div>
        <div v-if="getToken == null">
            <label><p>Username:</p>
                <input type="text" value="admin" />
            </label>
            <label><p>Password:</p>
                <input autofocus @keydown.enter="signin" type="password" />
            </label>
        </div>
        <div v-else>
            <button class="primary small button" @click="signout()">Sign out</button>
        </div>        
    </div>
</template>
<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name:"login",
    data() {
        return  {
            client: null,
            loading:false
        }
    },
    created: function() {
        this.client = this.$apollo.provider.defaultClient
        
    },
    computed: {
        ...mapGetters([
            "getToken"
        ])
    },
    methods: {
        ...mapActions([
            "setToken"
        ]),
        signin: function(evt) {
            this.client.mutate({
                mutation: gql `
                mutation($pass:String) {
                    signin(password:$pass) {
                        token
                    }
                }`,
                variables:{
                    pass:evt.target.value
                },
            })  
            .then(data => {
                this.setToken(data.data.signin.token)

            })
            .catch(error => this.setToken(null));
        }
    },
}
</script>