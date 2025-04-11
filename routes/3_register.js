const { Router } = require('express')
const passport = require('passport')
const router = Router()

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', passport.registerUser( { failureRedirect: '/register', successRedirect: '/login'}))

module.exports = router