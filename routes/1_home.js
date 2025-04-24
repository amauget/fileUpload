const { Router } = require('express')
const router = Router()
const getUserFileData = require('../controllers/userFunctions/getUserFiles')

router.get('/', async (req, res) => {
    let user = {}
    let files = []
    if(req.user){
        user = req.user
        files = await getUserFileData(user)
        console.log(files)
    }
    
    res.render('home', {user: user, files: files })
})

module.exports = router