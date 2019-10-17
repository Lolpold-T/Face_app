handleProfileGet = (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
	.then(user=> {
		if (user.length) {
			res.json(user[0]);
		} else {
			res.status(404).json('not found');
		}
		
	})
	// let found = false;
	// // database.users.forEach(user => {
	// // 	let found = false;
	// // 	if (user.id === id) {
	// // 		return res.json(user);
	// // 		found = true;
	// // 	}
	// // }) 
	// if (!found) {
	// 	res.status(404).json('not found');
	// }
}

module.exports = {handleProfileGet};