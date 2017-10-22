import express from 'express'
import expressGraphQL from 'express-graphql'
import schema from './schema/schema'

const app = express()

app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
***REMOVED***));

app.listen(4000, () => {
	console.log('Listening')
***REMOVED***);
