
const express = require('express');
const static = require('express-static');
const mysql = require('mysql');
const cookieparser = require('cookie-parser');
const cookiesession = require('cookie-session');
const consolidate = require('consolidate');
const expressRoute = require('express-route');
const bodyparser = require('body-parser');
const multer = require('multer');

const multerObj = multer({dest: './static/upload'});

const server = express();
server.listen(3000);


//1.  get the request data
server.use(bodyparser.urlencoded());
server.use(multerObj.any());

// 2. cookie session
server.use(cookieparser());


(function() {
	let arr = [];
	for (var i = 0; i < 100000; i++) {
		arr.push('sig_'+Math.random());
	}
	server.use(cookiesession({
		name: 'rick_sess_id',
		keys: arr,
		maxAge: 20*60*1000
	}));
})();


// 3. template
server.set('view engine', 'html');
server.set('views', './template');
server.engine('html', consolidate.ejs);

// 4. route

// for the normal web users
server.use('/', require('./route/web.js')());

// for the admin users
server.use('/admin/', require('./route/admin/index.js')());

// default static
server.use(static('./static'));































