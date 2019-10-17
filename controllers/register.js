 const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		return res.status(400).json('incorrect from submission');
	}
	const hash = bcrypt.hashSync(password);
		db.transaction(trx =>{ // use transaction when you have to do more than one thing
			trx.insert({hash, email})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email:loginEmail[0],
						name: name,
						joined: new Date()
					})
					.then(user => {
						res.json(user[0]);
					})
			})
			.then(trx.commit)  // makes sure it gets added
			.catch(trx.rollback)  // in case there is an error
		})
		.catch(err=> res.status(400).json('unable to register'))
	
	// database.users.push({
	// 			id: '125',
	// 			name: name,
	// 			email: email,
	// 			// password: password,
	// 			entries: 0,
	// 			joined: new Date()
	// })
	// res.json(database.users[database.users.length-1])
}

module.exports = {handleRegister};