const graphql = require('graphql');
const _ = require('lodash');
const Game = require('../models/game');
const Developer = require('../models/dev');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GrapgQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;
//=================================================
// GRAPHQL TYPES
//=================================================
const GameType = new GraphQLObjectType({
	name: 'Game',
	fields: () => ({
		id: {type: GraphQLID},
		title: {type: GraphQLString},
		genre: {type: GraphQLString},
		developer: {
			type: DevType,
			resolve(parent, args){
				return Developer.findById(parent.developerId);
			}
		}
	})
});
const DevType = new GraphQLObjectType({
	name: 'Developer',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		location: {type: GraphQLString},
		games: {
			type: new GraphQLList(GameType),
			resolve (parent,args) {
				return Game.find({developerId: parent.id});
			}
		}
	})
});
//=================================================
//END OF GRAPHQL TYPES
//=================================================
// QUERRIES
//=================================================
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		game: {
			type: GameType,
			args: {id: {type: GraphQLID}},
			resolve(parent,args){
				return Game.findById(args.id);
			}
		},
		games: {
			type: new GraphQLList(GameType),
			resolve(parent,args){
				return Game.find({});
			}
		},
		developer: {
			type: DevType,
			args: {id: {type: GraphQLID}},
			resolve(parent,args){
				return Developer.findById(args.id);
			}
		},
		developers: {
			type: new GraphQLList(DevType),
			resolve(parent,args){
				return Developer.find({});
			}
		}
	}
});
//=================================================
// END OF QUERRIES
//=================================================
//MUTATIONS
//=================================================
const Mustation = new GraphQLObjectType({
	name: 'Mustation',
	fields: {
		// ADD
		//---------------------------------------------
		//Game
		addGame: {
			type: GameType,
			args: {
				title: {type: new GraphQLNonNull(GraphQLString)},
				genre: {type: new GraphQLNonNull(GraphQLString)},
				developerId: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				let game = new Game({
					title: args.title,
					genre: args.genre,
					developerId: args.developerId
				});
				return game.save();
				}
			},
			//Developer
			addDev: {
				type: DevType,
				args: {
					name: {type: new GraphQLNonNull(GraphQLString)},
					location: {type: new GraphQLNonNull(GraphQLString)}
				},
				resolve(parent, args){
					let developer = new Developer ({
						name: args.name,
						location: args.location
					});
					return developer.save();
				}
			}
		//---------------------------------------------
		// UPDATE
		//---------------------------------------------
		//DELETE
	}
});
//=================================================
//END OF MUSTATIONS
//=================================================

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mustation
});
