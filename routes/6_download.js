const { Router } = require('express')
const router = Router()
const { cleanListKeys } = require('../controllers/handleUnsafeChars')
const getFileData = require('../controllers/fileHandlers/getFileData')
const createZip = require('../controllers/fileHandlers/createZip')

router.post('/', async (req, res) => {
    const fileNamesCleaned =  cleanListKeys(req.body) //takes in list, htmlEscape keys, returns array 
    if(fileNamesCleaned.length > 0){
        const targetFiles = await getFileData(fileNamesCleaned, req.user)
    
        const zipFile = await createZip(res, targetFiles)
    }
    // else{}
})

module.exports = router