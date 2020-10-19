let express = require('express');
let app = express();
const pg = require('pg');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_numbers';
const pool = new Pool({
	connectionString
});

const RegInstance = require('./factory-function/reg-numbers');
const regInstance = RegInstance();

const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

app.post('/registration', function(req, res){
  let enteredReg = req.body.textbox;
  
  res.render('home', {
    registration: regInstance.regSelection(enteredReg)
  })
})

let PORT = process.env.PORT || 3031;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});