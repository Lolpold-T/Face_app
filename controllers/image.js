const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey : 'd37d9761e7d643dbba4b0819cecc60c4'
});
// we need to hide our spi key so we put this in the back end
const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=> res.json(data))
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1) // 1 is the default
	.returning('entries')
	.then(entries=> res.json(entries[0]))
	.catch(err=> res.status(400).json('unable to get entries'))
	// let found = false;
	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		user.entries ++;
	// 		return res.json(user.entries);
	// 	}
	// });
	// if (!found) {
	// res.status(404).json('not found');
	// }
}
module.exports = {handleImage, handleApiCall}
