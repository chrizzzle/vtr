import mongoose from 'mongoose';
import config from './config';
import { PubSub, withFilter } from 'graphql-subscriptions';



mongoose.connect(config.db.url);
export const pubsub = new PubSub();

const sessionModel = mongoose.model('Session', {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    timer: Number,
    countdown: Number,
    active: Boolean,
    percent: Number
});

const optionModel = mongoose.model('Option', {
    _id:  mongoose.Schema.Types.ObjectId,
    name: String,
    sessionId: String,
    voteCount: Number
});

const voteModel = mongoose.model('Vote', {
    _id: mongoose.Schema.Types.ObjectId,
    optionId: String,
    sessionId: String
});

const userModel = mongoose.model('User', {
    _id: mongoose.Schema.Types.ObjectId,
});

// graphql-tools combines a schema string with resolvers.
import {makeExecutableSchema} from 'graphql-tools';

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Session {
    _id: ID!,
    name: String!,
    timer: Int!,
    countdown: Int!,
    active: Boolean!,
    percent: Int!
  }

  type Option {
    _id: ID!,
    name: String!,
    sessionId: String!
  }
  
  type Vote {
    _id: ID!,
    sessionId: ID!,
    optionId: ID!
  }
  
  type VoteCount {
    optionId: ID!,
    voteCount: Int
  }
  
  type Query {
    session(_id: ID!): Session!
    sessions: [Session]
    options(sessionId: ID!): [Option]
    votes(sessionId: ID!): [Vote]
    voteCount(optionId: ID!): VoteCount
  }
  
  type Mutation {
    deleteSession(_id: ID!): Boolean
    createSession(name: String!): Session
    createOption(name: String!, sessionId: ID!): Option
    createVote(sessionId: ID!, optionId: ID!): Vote
  }
  
  type Subscription {
    voteCount(optionId: ID!): VoteCount
    timerChanged(sessionId: ID!): Session
    sessionStarted(sessionId: ID!): Session
  }
`;


// Provide resolver functions for your schema fields
const resolvers = {
    Subscription: {
        voteCount: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('voteCount'),
                (payload, variables) => {
                    console.log(payload.voteCount.optionId, variables.optionId);
                    return payload.voteCount.optionId === variables.optionId;

                }
            )
        },
        sessionStarted: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('sessionStarted'),
                (payload, variables) => {
                    return payload.sessionId === variables.sessionId;
                }
            )
        },
        timerChanged: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('timerChanged'),
                (payload, variables) => {
                    return payload.sessionId === variables.sessionId;
                }
            )
        }
    },
    Query: {
        session: (root, args, context) => {
            return new Promise((resolve, reject) => {
                sessionModel.findOne({
                    _id: args._id
                }, null, (err, sessions) => {
                    if (err) { reject(err); }
                    else { resolve(sessions); }
                });
            });
        },
        sessions: (root, args, context) => {
            return new Promise((resolve, reject) => {
                sessionModel.find((err, sessions) => {
                    if (err) { reject(err); }
                    else { resolve(sessions); }
                });
            });
        },
        options: (root, args, context) => {
            return new Promise((resolve, reject) => {
                optionModel.find({
                    sessionId: args.sessionId
                }, (err, options) => {
                    if (err) { reject(err); }
                    else {resolve(options);}
                });
            });
        },
        votes: (root, args, context) => {
            return new Promise((resolve, reject) => {
                voteModel.find({
                    sessionId: args.sessionId
                }, (err, options) => {
                    if (err) { reject(err); }
                    else { resolve(options); }
                });
            });
        },
        voteCount: (root, args, context) => {
            const optionId = args.optionId;
            return Promise.resolve().then(() => {
                return voteModel.count({
                    optionId: optionId
                });
            }).then((voteCount) => {
                return {
                    optionId: args.optionId,
                    voteCount
                };
            });

        }
    },
    Mutation: {
        deleteSession: (root, args, context, info) => {
            return new Promise((resolve, reject) => {
                sessionModel.deleteOne({
                    _id: args._id
                }, null, (err) => {
                    if (err) { reject(err); }
                    else { resolve(); }
                });
            });
        },
        createSession: (root, args, context, info) => {
            return new Promise((resolve, reject) => {
                const session = new sessionModel(args);
                session._id = mongoose.Types.ObjectId();
                session.timer = 0;
                session.countdown = 0;
                session.active = false;
                session.percent = 0;

                session.save((err) => {
                    if (err) { reject(err); }
                    else { resolve(session); }
                });
            });
        },
        createOption: (root, args, context, info) => {
            return new Promise((resolve, reject) => {
                const option = new optionModel(args);
                option._id = mongoose.Types.ObjectId();
                option.sessionId = args.sessionId;
                option.name = args.name;
                option.save((err) => {
                    if (err) { reject(err); }
                    else { resolve(option); }
                });
            });
        },
        createVote: (root, args, context, info) => {
            return Promise.resolve().then(() => {
                const vote = new voteModel(args);
                vote._id = mongoose.Types.ObjectId();
                return vote.save();
            }).then((vote) => {
                return voteModel.count({
                    optionId: args.optionId,
                    sessionId: args.sessionId
                });
            }).then((voteCount) => {
                console.log({
                    voteCount: {
                        optionId: args.optionId,
                        voteCount
                    }
                });
                pubsub.publish('voteCount', {
                    voteCount: {
                        optionId: args.optionId,
                        voteCount
                    }
                });
            });
        }
    }
};

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
export function context(headers, secrets) {
    return {
        headers,
        secrets,
    };
}

// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
