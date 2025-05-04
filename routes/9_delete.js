const { Router } = require('express')
const router = Router()
const getUserFileData = require('../controllers/userFunctions/getUserFiles')
const { cleanListKeys } = require('../controllers/handleUnsafeChars')
const getFileData = require('../controllers/fileHandlers/getFileData')


router.get('/', async (req, res) => {
    let user = {}
    let files = []
    if(req.user){
        user = req.user
        files = await getUserFileData(user)
        res.render('delete', {user: user, files: files })

    }
    else{
        res.redirect('/')
    }
    
})

//DELETE Req
router.post('/', async (req, res) => {
    const fileNamesCleaned = cleanListKeys(req.body)
    if(fileNamesCleaned.length > 0){
        const targetFilesDelete = await getFileData(fileNamesCleaned, req.user)
        console.log(targetFilesDelete)
    }
})
module.exports = router