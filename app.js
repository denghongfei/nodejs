
let express = require('express');

let bodyParser = require('body-parser');

let app = express();


app.set('view engine', 'xtpl');

app.set('views', './views');

app.use(bodyParser.urlencoded());

app.use(express.static('public'));

app.listen(3000);

app.get('/', (req, res) => {

    res.render('index', {});

});

app.get('/doc', (req, res) => {

    res.render('doc', {});

})

app.get('/blog', (req, res) => {

    res.render('blog', {});

}); 

app.get('/test', (req, res) => {

	res.render('test', {});

});

app.post('/', (req, res) => {

	console.log(req.body);

	res.send('post方式');
	
    // res.send('post方式');

});