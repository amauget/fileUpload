const { Router } = require('express')
const router = Router()
const passport = require('../controllers/authHandlers/passport')

router.get('/', (req, res) => {
    let message = ''
    if(req.query.status === 'fail'){
        message = req.query.message
    }
    res.render('login', {message: message})
})

router.post('/', passport.authenticate('login', { failureRedirect: '/login?status=fail&message=Invalid credentials', successRedirect: '/'}))

module.exports = router