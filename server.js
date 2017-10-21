const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')
const app = express()

app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
***REMOVED***));

app.listen(4000, () => {
	console.log('Listening')
***REMOVED***);
