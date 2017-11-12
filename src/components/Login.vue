<template>
<div>
    <label><p>Username:</p>
        <input type="text" value="admin" />
    </label>
    <label><p>Password:</p>
        <input autofocus @keydown.enter="signin" type="password" />
    </label>
</div>
</template>
<script>
import gql from 'graphql-tag'

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
    methods: {
        signin: function(evt) {
            console.log(this.client)
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
            .then(data => console.log(data))
            .catch(error => console.error(error));
        }
    },
}
</script>