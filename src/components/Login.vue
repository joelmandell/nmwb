<template>
<div>
    <label><p>Username:</p>
        <input type="text" value="admin" />
    </label>
    <label><p>Password:</p>
        <input autofocus @keydown.enter="signin" type="password" />
    </label>
    {{ getToken }}
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
                }
            })  
            .then(data => {
                console.log(data.data.signin.token)
                this.setToken(data.data.signin.token)
            })
            .catch(error => console.error(error));
        }
    },
}
</script>