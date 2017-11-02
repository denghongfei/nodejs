
let http = require('http');

let app = http.createServer();

let url = require('url');

let fs = require('fs');

let db = require('./database/students.json');

let path = require('path');

let template = require('art-template');

template.defaults.root = './views';
template.defaults.extname = '.html'

app.listen(3000, (err)=> {

	if(!err) {
		console.log('启动服务器');
	}
});

app.on('request', (req,res) => {

	let {pathname} = url.parse(req.url);

	// console.log(pathname);

	let realPath = path.join('public', pathname);


	res.render = function (tpl,data){

		let html = template(tpl,data);

		res.end(html);

	}


	switch(pathname) {

		case '/':
		case '/add':

			res.render('add',{});
		break;

		case '/list':

			res.render('list',{list: db});

		break;	

		case '/create':

			let {query} = url.parse(req.url,true);

			db.push(query);
			console.log(JSON.stringify(db));

			fs.writeFile('./database/students.json', JSON.stringify(db), (err) =>{
				if(!err) {
					res.writeHead(302,{
						'Location': '/list'
					})
				}
				res.end();

			})

		break;

		case '/delete':

			let list = url.parse(req.url,true).query;

			console.log(list);

			let id = list.id;

			db.splice(id,1);

			fs.writeFile('./database/students.json', JSON.stringify(db), (err) =>{
				if(!err) {
					res.writeHead(302,{
						'Location': '/list'
					})
				}
				res.end();

			})



		break;

		default: 

			fs.readFile(realPath,(err,data) =>{
				if(!err) {
					res.end(data);
				}
			});
	}

});