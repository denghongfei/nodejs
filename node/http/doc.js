
 let http = require('http');

 let fs = require('fs');

 let path = require('path'); 

 let mime = require('mime');

 let server = http.createServer();

 server.listen(3000, () => {
 	console.log('服务器跑起来吧');
 });

 server.on('request', (req,res) =>{

 	console.log(req.url);

 	if(req.url =='/') {

 		res.writeHeader(200,{

 			'Content-Type': 'text/html; charset=UTF-8'

 		});

 		fs.readFile('./doc.html', 'utf-8', (err,data)=> {

 			if(!err) {
 				// console.log(data);
 				res.write(data);
 				res.end();
 			}

 		});
 	} else {
 		let realPath = path.join('./',req.url);

 		console.log(realPath);

 		fs.readFile(realPath, (err,data) => {
 			if(!err) {

 				res.writeHeader(200,{
 					'Content-Type': 'mime.getType(realPath)'
 				});

 				res.write(data);
 				res.end();
 			}
 		});
 	}
 	
 });