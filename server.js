import express from 'express'
import expressGraphQL from 'express-graphql'
import schema from './schema/schema'
import jwt from 'express-jwt'
import fs from 'fs'
import config from './config.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('Listening')
});
