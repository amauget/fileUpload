const { Router } = require('express')
const router = Router()
const passport = require('passport')
const registerUser = require('../controllers/authHandlers/handleRegister')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res, error) =>{
    const isRegistered = await registerUser(req.body)
    
    if(isRegistered){
        console.log('success')
        res.redirect('login')
    }
    else{
        console.log('invalid')
        res.render('register')
    }
   
})

module.exports = router