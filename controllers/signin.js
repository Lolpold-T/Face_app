 handleSignin = (db, bcrypt) =>  (req, res) => {
 	const {email, password} = req.body;
 	if (!email || !password) {
		return res.status(400).json('incorrect from submission');
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', req.body.email)
	.then(data=> {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if (isValid) {
			return db.select('*').from('users')  // we  return it so the db knows about it
			.where('email', '=', email)
			.then(user=> {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('wrong credentials')
		}
	})
	.catch(err => res.status(400).json('wrong credentials'))

	// 	// Load hash from your password DB.
	// bcrypt.compare("apples", '$2a$10$N/EN9xJJpYjQ7dMUMQhzr.zDDKbFZhW1LoG0X.5Ivs1vBI7HqDbpi', function(err, res) {
	//     // res == true
	//     console.log('first guess' , res)
	// });
	// bcrypt.compare("veggies", '$2a$10$N/EN9xJJpYjQ7dMUMQhzr.zDDKbFZhW1LoG0X.5Ivs1vBI7HqDbpi', function(err, res) {
	//     // res = false
	//     console.log('second guess' , res)
	// });
	// if (req.body.email === database.users[0].email &&
	// 	req.body.password === database.users[0].password){
	// 	res.json(db.users[0]);
	// } else {
	// 	res.status(400).json('error logging in');
	// }
}

module.exports = {handleSignin : handleSignin};
