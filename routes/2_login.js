const { Router } = require('express')
const router = Router()
const passport = require('../controllers/authHandlers/passport')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/'}))

module.exports = router