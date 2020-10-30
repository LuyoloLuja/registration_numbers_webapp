let express = require('express');
let app = express();
const pg = require('pg');
const bodyParser = require('body-parser')
const RegInstance = require('./reg-numbers');

const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/reg_numbers';
const pool = new Pool({
  connectionString
});

const regInstance = RegInstance(pool);

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {

  res.render('home');
});

app.post('/reg_numbers', async function (req, res) {
  let enteredReg = req.body.userRegistration;
  enteredReg = enteredReg.toUpperCase();

  if(enteredReg){
    regInstance.enteredNumber(enteredReg);
    await regInstance.settingReg(enteredReg);
    var registrationNumber = await regInstance.printRegistrations();
  }

  console.log(await regInstance.printRegistrations());

  res.render('home', {
    registration: registrationNumber
  })
})

// app.get('/reg_numbers', async function (req, res) {

//   let insertedNumbers = await regInstance.printRegistrations()

//   res.render('home', {
//     registration: insertedNumbers
//   })
// })


let PORT = process.env.PORT || 3031;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});