// app requirments
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const config = require('./config/globals');
const cors = require('cors');
const app = express()

app.use(cors());

// connection to mongodb
mongoose.connect(config.db);

mongoose.connection.once('open', () => {
	console.log('connection to db open');
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(3050,() =>{
	console.log('server running! listening on port:3050')
});
