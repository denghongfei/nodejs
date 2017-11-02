
var http = require('http');

var fs = require('fs');

var path = require('path');

var mime = require('mime');

var server = http.createServer();

server.listen(3000, ()=> {
	console.log('加油少年');
})

server.on('request', (req,res)=> {

	// console.log(req.url);

	if(req.url == '/') {

		res.writeHeader(200,{
			'Content-Type': 'text/html charset=UTF-8'
		});

		fs.readFile('./blog.html', 'utf-8', (err,data) =>{
			
			// console.log(data);
			if(!err) {
				res.write(data);
				res.end();
			}

		});
	} else {

		let realPath = path.join('./',req.url);

		// console.log(realPath);

		fs.readFile(realPath, (err,data)=> {
			if(!err) {
				// console.log(mime.getType(realPath));
				res.writeHeader(200,{
					'Content-Type': mine.getType(realpath)
				});

				res.write(data);
				res.end();			
			}
		});
	}
});