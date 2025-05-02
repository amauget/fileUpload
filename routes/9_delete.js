const { Router } = require('express')
const router = Router()
const getUserFileData = require('../controllers/userFunctions/getUserFiles')

router.get('/', async (req, res) => {
    let user = {}
    let files = []
    if(req.user){
        user = req.user
        files = await getUserFileData(user)
    }
    
    res.render('delete', {user: user, files: files })
})

router.post('/', async (req, res) => {
    console.log(req.query)
})
module.exports = router