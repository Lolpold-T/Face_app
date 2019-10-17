const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '123',
		database: 'postgres'
	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send(db.users));

app.post('/signin', signin.handleSignin(db, bcrypt));  // automatically runs request response alternative way to do it
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)}); // injecting dependencies
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

const port = process.env.PORT;
app.listen(port || 3000, ()=> console.log(`app is running on port ${port}`));

//old database
// const database = {
// 	users: [
// 	{
// 		id: '123',
// 		name: 'John',
// 		email: 'john@gmail.com',
// 		password: 'cookies',
// 		entries: 0,
// 		joined: new Date()
// 	},
// 	{
// 		id: '124',
// 		name: 'Sally',
// 		email: 'sally@gmail.com',
// 		password: 'bananas',
// 		entries: 0,
// 		joined: new Date()
// 	}
// 	],
// }