const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get( (req, res) => {
	// find() is mongoose method that queries all the collections and returns a promise
	User.find()
		.then( users => res.json(users)) // return the users in json
		.catch( err => res.status(400).json('Error : ' + err));
});

router.route('/add').post( (req, res) => {
	const username = req.body.username;

	const newUser = new User({username});

	newUser.save()
		.then( () => res.json('User added!'))
		.catch( err => res.status(400).json('Error : ' + err));
});

module.exports = router;