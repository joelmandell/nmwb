import {	
GraphQLObjectType,GraphQLString,GraphQLInt, GraphQLSchema, GraphQLList, GraphQLBoolean,
GraphQLInputObjectType
***REMOVED*** from 'graphql'

import Sequelize from 'sequelize'
import SqlSettings from '.././config.js'

const seq = new Sequelize(SqlSettings.db,SqlSettings.dbUser,SqlSettings.dbPass, {
	host:SqlSettings.host,
	dialect:SqlSettings.dialect,
	pool : {
		max:20,
		min:0,
		idle:1000
	***REMOVED***,
	logging:false
***REMOVED***)

const Pupils = seq.import('./../models/mwb_pupils.js')
const Schedules = seq.import('./../models/mwb_schedule.js')
const Lessons = seq.import('./../models/mwb_lessons.js')
const Settings = seq.import('./../models/mwb_settings.js')
const Taxanomy = seq.import('./../models/mwb_taxanomy.js')

const ScheduleType = new GraphQLObjectType({
	name:'Schedule',
	fields: {
		id: { type: GraphQLInt ***REMOVED***,
		year: { type: GraphQLInt ***REMOVED***,
		week: { type: GraphQLInt ***REMOVED***,
		taxanomyId: { type: GraphQLInt ***REMOVED***,
		pupilId: { type: GraphQLInt ***REMOVED***,
		lessonId: { type: GraphQLInt ***REMOVED***,
		participant: { type: GraphQLBoolean ***REMOVED***,
	***REMOVED***
***REMOVED***);

const ScheduleInputType = new GraphQLInputObjectType({
	name:'ScheduleInput',
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
		comments: { type: GraphQLString ***REMOVED***,
		tasks: { 
			name:'pupiltasks',
			type: new GraphQLList(ScheduleType),
			resolve(parentValue) {				
				return Schedules.findAll({
					where: {
						pupilId:parentValue.dataValues.id
					***REMOVED***
				***REMOVED***)
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***); 

const PupilInputType = new GraphQLInputObjectType({
	name:'PupilInput',
	fields: {
		id: { type: GraphQLInt ***REMOVED***,
		firstName: { type: GraphQLString ***REMOVED***, 
		lastName: { type: GraphQLString ***REMOVED***,
		conducting: { type: GraphQLInt ***REMOVED***,
		comments: { type: GraphQLString ***REMOVED***
	***REMOVED***
***REMOVED***); 

const LessonType = new GraphQLObjectType({
	name:'Lesson',
	fields: {
		id: { type: GraphQLInt ***REMOVED***,
		name: { type: GraphQLString ***REMOVED***
	***REMOVED***
***REMOVED***); 

const TaxanomyType = new GraphQLObjectType({
	name:'Taxanomy',
	fields: {
		id: { type: GraphQLInt ***REMOVED***,
		name: { type: GraphQLString ***REMOVED***,
		participant: { type: GraphQLBoolean ***REMOVED***
	***REMOVED***
***REMOVED***); 

const SettingsType = new GraphQLObjectType({
	name:'Settings',
	fields: {
		id: { type: GraphQLInt ***REMOVED***,
		year: { type: GraphQLInt ***REMOVED***,
		dayMidweekMeeting: { type: GraphQLInt ***REMOVED***,
		circuitWeek1: { type: GraphQLInt ***REMOVED***,
		circuitWeek2: { type: GraphQLInt ***REMOVED***,
		cAssembly1: { type: GraphQLInt ***REMOVED***,
		cAssembly2: { type: GraphQLInt ***REMOVED***,
		regionalConvention: { type: GraphQLInt ***REMOVED***,
		memorial: { type: GraphQLInt ***REMOVED***,
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
		***REMOVED***,
		lessons: {
			type: new GraphQLList(LessonType),
			resolve(parentValue, {id,name***REMOVED***) {
				return Lessons.findAll().then( (data) => data)
			***REMOVED***
		***REMOVED***,
		lesson: {
			type: LessonType,
			args: { id: {type: GraphQLInt***REMOVED*** ***REMOVED***,
			resolve(parentValue, {id***REMOVED***) {
				return Lessons.findById(id).then( (data) => data)
			***REMOVED***
		***REMOVED***,
		settings: {
			type:new GraphQLList(SettingsType),
			resolve(parentValue) {
				return Settings.findAll().then( (data) => data)
			***REMOVED***
		***REMOVED***,
		setting: {
			type: SettingsType,
			args: { year: { type: GraphQLInt ***REMOVED*** ***REMOVED***,
			resolve(parentValue, {year***REMOVED***) {
				return Settings.findOne({
					where: {
						year
					***REMOVED***
				***REMOVED***).then( (data) => data)
			***REMOVED***
		***REMOVED***,
		taxonomies: {
			type:new GraphQLList(TaxanomyType),
			resolve(parentValue) {
				return Taxanomy.findAll().then( (data) => data)
			***REMOVED***
		***REMOVED***,
	***REMOVED***
***REMOVED***);

const RootMutation = new GraphQLObjectType({
	name:'RootMutation',
	fields: {
		addScheduleItem: {
			type:ScheduleType,
			input: {
				type: ScheduleInputType
			***REMOVED***,
			resolve(parentValue, {input***REMOVED***) {
				return Schedules.create({input***REMOVED***)
			***REMOVED***
		***REMOVED***,
		updateScheduleItem: {
			type:ScheduleType,
			input: {
				type: ScheduleInputType
			***REMOVED***,
			resolve(parentValue, {input***REMOVED***) {
				return Schedules.create({input***REMOVED***)
			***REMOVED***
		***REMOVED***,
		addPupil: {
			type: PupilType,
			input: {
				type: PupilInputType
			***REMOVED***,
			resolve(parentValue, {input***REMOVED***) {
				return Pupils.create({input***REMOVED***)
			***REMOVED***
		***REMOVED***,
		updatePupil: {
			type: PupilType,
			args: {
				input: {
					type: PupilInputType
				***REMOVED***
			***REMOVED***,
			resolve(parentValue,{input***REMOVED***) {
				return Pupils.update(
					input,
					{ where : {id: input.id ***REMOVED*** ***REMOVED***
				).then( (data) => {
					return Pupils.findById(input.id).then( (data) => data)
				***REMOVED***)
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

