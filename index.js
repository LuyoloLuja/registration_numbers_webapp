let express = require('express');
let app = express();
const pg = require('pg');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_numbers';
const pool = new Pool({
  connectionString
});

const RegInstance = require('./factory-function/reg-numbers');
const regInstance = RegInstance(pool);

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {

  res.render('home');
});

app.post('/reg_numbers', async function (req, res) {
  let enteredReg = req.body.userRegistration;

  let registrationNumber = await regInstance.appendRegNums(enteredReg);

  console.log(registrationNumber);

  res.render('home', {
    registration: registrationNumber
  })
})

app.get('/reg_numbers', async function (req, res) {

  res.render('home', {

  })
})

let PORT = process.env.PORT || 3031;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});