import {	
GraphQLObjectType,GraphQLString,GraphQLInt, GraphQLSchema, GraphQLList, GraphQLBoolean,
GraphQLInputObjectType, GraphQLException
} from 'graphql'
import fs from 'fs'
import Sequelize from 'sequelize'
import config from '.././config.js'
import bcrypt from 'bcrypt'
import j from 'jsonwebtoken'

const validate = (req) => {
	let token = req.headers.authorization.replace('Bearer ','')
	return j.verify(token, config.secret, function(err, decoded) {
		if(err) return false
		
		return true
	});
	
	return false
}

const seq = new Sequelize(config.db,config.dbUser,config.dbPass, {
	host:config.host,
	dialect:config.dialect,
	pool : {
		max:20,
		min:0,
		idle:1000
	},
	logging:false
})

const Pupils = seq.import('./../models/mwb_pupils.js')
const Schedules = seq.import('./../models/mwb_schedule.js')
const Lessons = seq.import('./../models/mwb_lessons.js')
const Settings = seq.import('./../models/mwb_settings.js')
const Taxanomy = seq.import('./../models/mwb_taxanomy.js')

const TaxonomyType = new GraphQLObjectType({
	name:'Taxonomy',
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		participant: { type: GraphQLInt },
		movie: { type: GraphQLInt }
	}
}); 

const TaxonomyInputType = new GraphQLInputObjectType({
	name:'TaxonomyInput',
	fields: {
		name: { type: GraphQLString },
		participant: { type: GraphQLInt },
		movie: { type: GraphQLInt }
	}
});

const ScheduleType = new GraphQLObjectType({
	name:'Schedule',
	fields: {
		id: { type: GraphQLInt },
		year: { type: GraphQLInt },
		week: { type: GraphQLInt },
		taxanomyId: { type: GraphQLInt },
		taxanomies: { 
			name:'taxanomies',
			type: TaxonomyType,
			resolve(parentValue) {
				return Taxanomy.findOne({ where : {id:parentValue.dataValues.taxanomyId} }).then( (data) => data)				
			}
		},
		pupilId: { type: GraphQLInt },
		lessonId: { type: GraphQLInt },
		participant: { type: GraphQLBoolean },
	}
});

const ScheduleInputType = new GraphQLInputObjectType({
	name:'ScheduleInput',
	fields: {
		id: { type: GraphQLInt },
		year: { type: GraphQLInt },
		week: { type: GraphQLInt },
		taxanomyId: { type: GraphQLInt },
		pupilId: { type: GraphQLInt },
		lessonId: { type: GraphQLInt },
		participant: { type: GraphQLBoolean }
	}
});

const PupilType = new GraphQLObjectType({
	name:'Pupil',
	fields: {
		id: { type: GraphQLInt },
		firstName: { type: GraphQLString }, 
		lastName: { type: GraphQLString },
		conducting: { type: GraphQLInt },
		comments: { type: GraphQLString },
		woman: { type: GraphQLBoolean },
		tasks: { 
			name:'pupiltasks',
			type: new GraphQLList(ScheduleType),
			resolve(parentValue) {				
				return Schedules.findAll({
					where: {
						pupilId:parentValue.dataValues.id
					}
				})
			}
		}
	}
}); 

const PupilInputType = new GraphQLInputObjectType({
	name:'PupilInput',
	fields: {
		id: { type: GraphQLInt },
		firstName: { type: GraphQLString }, 
		lastName: { type: GraphQLString },
		conducting: { type: GraphQLInt },
		comments: { type: GraphQLString },
		woman: { type: GraphQLBoolean }
	}
}); 

const LessonType = new GraphQLObjectType({
	name:'Lesson',
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString }
	}
}); 

const SettingsType = new GraphQLObjectType({
	name:'Settings',
	fields: {
		id: { type: GraphQLInt },
		year: { type: GraphQLInt },
		dayMidweekMeeting: { type: GraphQLInt },
		circuitWeek1: { type: GraphQLInt },
		circuitWeek2: { type: GraphQLInt },
		cAssembly1: { type: GraphQLInt },
		cAssembly2: { type: GraphQLInt },
		regionalConvention: { type: GraphQLInt },
		memorial: { type: GraphQLString },
	}
}); 

const SettingsInputType = new GraphQLInputObjectType({
	name:'SettingsInput',
	fields: {
		id: { type: GraphQLInt },
		year: { type: GraphQLInt },
		dayMidweekMeeting: { type: GraphQLInt },
		circuitWeek1: { type: GraphQLInt },
		circuitWeek2: { type: GraphQLInt },
		cAssembly1: { type: GraphQLInt },
		cAssembly2: { type: GraphQLInt },
		regionalConvention: { type: GraphQLInt },
		memorial: { type: GraphQLString },
	}
}); 

const UserType = new GraphQLObjectType({
	name:'User',
	fields: {
		token: { type: GraphQLString}
	}
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		pupil: {
			type: PupilType,
			args: { id: { type: GraphQLInt } },
			resolve(parentValue, args, req) {
				if(!validate(req)) return false
				return Pupils.findById(args.id).then( (data) => data)
			}
		},
		pupils: {
			type: new GraphQLList(PupilType),
			resolve(parentValue,args,req) {
				if(!validate(req)) return false

				return Pupils.findAll().then( (data) => data)
			}
		},
		schedules: {
			type: new GraphQLList(ScheduleType),
			resolve(parentValue) {
				return Schedules.findAll().then( (data) => data)
			}
		},
		lessons: {
			type: new GraphQLList(LessonType),
			resolve(parentValue, {id,name}) {
				return Lessons.findAll().then( (data) => data)
			}
		},
		lesson: {
			type: LessonType,
			args: { id: {type: GraphQLInt} },
			resolve(parentValue, {id}) {
				return Lessons.findById(id).then( (data) => data)
			}
		},
		settings: {
			type:new GraphQLList(SettingsType),
			resolve(parentValue) {
				return Settings.findAll().then( (data) => data)
			}
		},
		setting: {
			type: SettingsType,
			args: { year: { type: GraphQLInt } },
			resolve(parentValue, {year}) {
				return Settings.findOne({
					where: {
						year
					}
				}).then( (data) => data)
			}
		},
		taxonomies: {
			type:new GraphQLList(TaxonomyType),
			resolve(parentValue) {
				return Taxanomy.findAll().then( (data) => data)
			}
		},
		taxanomy: {
			type: TaxonomyType,
			args: {
				id: {type: GraphQLInt }
			},
			resolve(parentValue, {id}) {
				return Taxanomy.findOne({ where : {id} }).then( (data) => data)
			}
		}
	}
});

const RootMutation = new GraphQLObjectType({
	name:'RootMutation',
	fields: {
		signin: {
			type:UserType,
			args: {
				password: { type: GraphQLString }
			},
			resolve(parentValue, {password}) {
				let data = JSON.parse(fs.readFileSync("ha.js","utf8"))
					GraphQLString
				return bcrypt.compare(password,data.hash).then((res) => {
					if(!res)	throw "Wrong credentials"
					
					const token = j.sign({
						id:'1',
						name:'admin'	
					},config.secret)
					
					return {token}
				})
			}
		},
		updateSettings: {
			type:SettingsType,
			args: {
				input: {
					type: SettingsInputType
				},
			},
			resolve(parentValue, {input}) {
				return Settings.update(
					input,
					{ where : {id: input.id } }
					).then( (data) => {
						return Settings.findById(input.id).then( (data) => data)
					})
			}
		},
		addScheduleItem: {
			type:ScheduleType,
			args: {
				input: {
					type: ScheduleInputType
				},
			},
			resolve(parentValue, {input}) {
				return Schedules.create({input})
			}
		},
		updateScheduleItem: {
			type:ScheduleType,
			input: {
				type: ScheduleInputType
			},
			resolve(parentValue, {input}) {
				return Schedules.create({input})
			}
		},
		addTaxonomy: {
			type: TaxonomyType,
			args: {
				taxonomy: {
					type: TaxonomyInputType
				}
			},
			resolve(parentValue, {taxonomy}) {
				return Taxanomy.create(taxonomy)
			}
		},
		addPupil: {
			type: PupilType,
			args: {
				pupil: {
					type: PupilInputType
				}
			},
			resolve(parentValue, {pupil}) {
				return Pupils.create(pupil)
			}
		},
		updatePupil: {
			type: PupilType,
			args: {
				input: {
					type: PupilInputType
				}
			},
			resolve(parentValue,{input}) {
				return Pupils.update(
					input,
					{ where : {id: input.id } }
				).then( (data) => {
					return Pupils.findById(input.id).then( (data) => data)
				})
			}
		},
		deletePupil: {
			type: PupilType,
			args: {
				id: { type:GraphQLInt }
			},
			resolve(parentValue, {id}) {
				return Pupils.destroy({ 
					where: {
						id
					}
				})
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query:RootQuery,
	mutation:RootMutation
});

