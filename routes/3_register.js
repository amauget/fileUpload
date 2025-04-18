const { Router } = require('express')
const router = Router()
const passport = require('passport')
const registerUser = require('../controllers/authHandlers/handleRegister')

router.get('/', (req, res) => {
    res.render('register', { message: '' })
})

router.post('/', async (req, res, error) =>{
    const regStatus = await registerUser(req.body)
    if(regStatus === 'success'){
        console.log('success')
        res.redirect('login')
    }
    else{
        console.log('invalid')
        res.render('register', { message: regStatus })
    }
   
})

module.exports = router