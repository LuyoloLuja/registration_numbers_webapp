let express = require('express');
let app = express();
const pg = require('pg');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');
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

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.get('/', async function (req, res) {
  const towns = await regInstance.getTowns()
  res.render('home', {
    town: towns
  });
});

app.post('/reg_numbers', async function (req, res) {
  let enteredReg = req.body.userRegistration;
  enteredReg = enteredReg.toUpperCase();

  let diplicateCheck = await regInstance.duplicateMessage(enteredReg);
 
  if (diplicateCheck !== 0) {
    req.flash('info', 'Registration number already exists!');
  } else if (!enteredReg) {
    req.flash('error', 'Please enter a registration number!');
  } else if (enteredReg.startsWith("CA ") || enteredReg.startsWith("CL ") || enteredReg.startsWith("CJ ")) {
    await regInstance.settingReg(enteredReg);
    var registrationNumber = await regInstance.printRegistrations();
  } else if (!enteredReg.startsWith("CA ") || !enteredReg.startsWith("CL ") || !enteredReg.startsWith("CJ ")) {
    req.flash('error', 'Please enter a valid registration number!');  
  }

  let towns = await regInstance.getTowns();

  res.render('home', {
    registration: registrationNumber,
    town: towns
  })
})

app.get('/reg_numbers', async function (req, res) {
  const towns = await regInstance.getTowns();
  let storedReg = req.query.filter;

  let filtering = await regInstance.filter(storedReg);

  res.render('home', {
    registration: filtering,
    town: towns
  })
})

app.get('/reset', async function (req, res) {
  await regInstance.resetBtn()
  res.redirect('/')
})

let PORT = process.env.PORT || 3031;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});