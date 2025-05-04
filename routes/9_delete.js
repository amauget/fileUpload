const { Router } = require('express')
const router = Router()
const getUserFileData = require('../controllers/userFunctions/getUserFiles')
const { cleanListKeys } = require('../controllers/handleUnsafeChars')
const getFileData = require('../controllers/fileHandlers/getFileData')
const { uploadBytes } = require('../controllers/fileHandlers/fileAuditors')
const deleteFiles = require('../controllers/fileHandlers/deleteFiles')
const { usedSpaceUpdated, userFilesRemove } = require('../controllers/userFunctions/updateUserData')

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
    try{
        console.log(fileNamesCleaned)
        if(fileNamesCleaned.length > 0){
            const targetFilesDelete = await getFileData(fileNamesCleaned, req.user)
        
            const deleteFileSize = uploadBytes(targetFilesDelete) * -1 //to be subtracted from DB..
            
            deleteFiles(targetFilesDelete)
    
            await usedSpaceUpdated(req.user, deleteFileSize)
            
    
            await userFilesRemove(req.user, targetFilesDelete)
            
            res.redirect('/') //OVERDRAFTING USEDSTORAGE RISK. Make sure this disallows negative usedStorage Balance
        }
    }
    catch(err){
        console.error(err)
        res.redirect('/error')
    }
 
})
module.exports = router