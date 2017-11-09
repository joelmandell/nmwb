import express from 'express'
import expressGraphQL from 'express-graphql'
import schema from './schema/schema'
import jwt from 'express-jwt'
import fs from 'fs'
import config from './config.js'

const app = express()

app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
***REMOVED***));

app.get('/', function(req,res) {
	fs.readFile('./index.html', 'utf8', function(err, contents) {
		res.send(contents)
	***REMOVED***);
***REMOVED***)
app.listen(4000, () => {
	console.log('Listening')
***REMOVED***);
