var 		http					= require('http'),
		express					= require('express'),
		mongoose				= require('mongoose'),
		path					= require('path'),
		bodyParser				= require('body-parser');

var		app					= express();
var 		http					= require('http').Server(app);
var 		myapi 					= require('apimain');
var 		aport 					= 80;
/*
// db config 
var 	config 					= {
	"HOST"		:	"127.0.0.1",
	"PORT"		:	"27017",
	"DATABASE"	:	DATA_BASE_NAME
};

// establish db connection and pass to other classes to share 
var		dbPath 				    = "mongodb://" + config.HOST + ":" + config.PORT + "/" + config.DATABASE;
var 	db 					    = mongoose.connection;
mongoose.connect(dbPath);
db.on('error', console.error);
db.once('connected', function() { console.log('connected to mongodb');});
db.once('open', function() {
});
*/


var xPolicy			    = function (req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    	next();
};
app.use(xPolicy);

app.set('port', process.env.PORT || aport);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.all('*', function(req, res, next){req.syspath 	= __dirname; next();} )

app.use('/api', myapi);
app.use('/', express.static(path.join(__dirname, 'webroot')));
app.get('/', function (req, res){ res.sendFile(__dirname + '/webroot/Default.html'); })


app.get('/favicon.png', function(req, res){	res.sendStatus(200); });

http.listen(app.get('port'), function(){
	console.log('Server Started - Running on port: ' + app.get('port'));
});
