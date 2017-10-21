const graphql = require('graphql')
const {	
GraphQLObjectType,GraphQLString,GraphQLInt, GraphQLSchema, GraphQLList, GraphQLBoolean,
GraphQLInputType
***REMOVED*** = graphql
const Sequelize = require('sequelize')
const Settings = require('.././config.js')

const seq = new Sequelize(Settings.db,Settings.dbUser,Settings.dbPassword, {
	host:Settings.host,
	dialect:Settings.dialect,
	pool : {
		max:20,
		min:0,
		idle:1000
	***REMOVED***,
	logging:false
***REMOVED***)

const Pupils = seq.import('./../models/mwb_pupils.js')
const Schedules = seq.import('./../models/mwb_schedule.js')

const ScheduleType = new GraphQLObjectType({
	name:'Schedule',
	fields: {
		id: { type: GraphQLInt ***REMOVED***,
		year: { type: GraphQLInt ***REMOVED***,
		week: { type: GraphQLInt ***REMOVED***,
		taxanomyId: { type: GraphQLInt ***REMOVED***,
		pupilId: { type: GraphQLInt ***REMOVED***,
		lessonId: { type: GraphQLInt ***REMOVED***,
		participant: { type: GraphQLBoolean ***REMOVED***
	***REMOVED***
***REMOVED***);

const PupilType = new GraphQLObjectType({
	name:'Pupil',
	fields: {
		id: { type: GraphQLInt ***REMOVED***,
		firstName: { type: GraphQLString ***REMOVED***, 
		lastName: { type: GraphQLString ***REMOVED***,
		conducting: { type: GraphQLInt ***REMOVED***,
		comments: { type: GraphQLString ***REMOVED***
	***REMOVED***
***REMOVED***); 

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		pupil: {
			type: PupilType,
                        args: { id: { type: GraphQLInt ***REMOVED*** ***REMOVED***,
			resolve(parentValue, args) {
				return Pupils.findById(args.id).then( (data) => data)
			***REMOVED***
		***REMOVED***,
		pupils: {
			type: new GraphQLList(PupilType),
			resolve(parentValue) {
				return Pupils.findAll().then( (data) => data)
			***REMOVED***
		***REMOVED***,
		schedules: {
			type: new GraphQLList(ScheduleType),
			resolve(parentValue) {
				return Schedules.findAll().then( (data) => data)
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***);

const RootMutation = new GraphQLObjectType({
	name:'RootMutation',
	fields: {
		addPupil: {
			type: PupilType,
			args: {
				firstName: { type: GraphQLString ***REMOVED***,
				lastName: { type: GraphQLString ***REMOVED***
			***REMOVED***,
			resolve(parentValue, {firstName,lastName***REMOVED***) {
				return Pupils.create({firstName,lastName***REMOVED***)
			***REMOVED***
		***REMOVED***,
		deletePupil: {
			type: PupilType,
			args: {
				id: { type:GraphQLInt ***REMOVED***
			***REMOVED***,
			resolve(parentValue, {id***REMOVED***) {
				Pupils.destroy({ 
					where: {
						id
					***REMOVED***
				***REMOVED***)
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***)

module.exports = new GraphQLSchema({
	query:RootQuery,
	mutation:RootMutation
***REMOVED***);

