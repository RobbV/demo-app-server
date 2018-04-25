// app requirments
const express = require('express');
var path = require('path');
const graphqlHTTP = require('express-graphql');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const config = require('./config/globals');
const cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// app.listen(3050,() =>{
// 	console.log('server running! listening on port:3050')
// });
