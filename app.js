const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./util/database');
const errorController = require('./controllers/errorController');
const homeRouter = require('./routes/home');
const pokemonRouter = require('./routes/pokemon');
const pokemonTypeRouter = require('./routes/pokemonType');
const regionRouter = require('./routes/region');
const Pokemon = require('./models/pokemon');
const PokemonType = require('./models/pokemonType');
const Region = require('./models/region');
const compareHelper = require('./util/helpers/hbs/compare');

const hostname = '127.0.0.1';
const port = 5000;

const app = express();

// View engine config
app.engine('hbs', expressHbs({
	layoutDir: 'views/layouts',
	defaultLayout: 'mainLayout',
	extname: 'hbs',
	helpers: {
		idsAreEqual: compareHelper.idsAreEqual
	}
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

// Middlewares config
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(homeRouter);
app.use(pokemonRouter);
app.use(regionRouter);
app.use(pokemonTypeRouter);
app.use('/', errorController.get404);

// Relationships
Pokemon.belongsTo(Region, {constraints: true, onDelete: 'CASCADE'});
Region.hasMany(Pokemon);
Pokemon.belongsTo(PokemonType, {constraints: true, onDelete: 'CASCADE'});
PokemonType.hasMany(Pokemon);

sequelize.sync()
	.then(result => {
		app.listen(port, hostname, () => console.log(`App running at http://${hostname}:${port}/`));
	})
	.catch(err => console.error(err));