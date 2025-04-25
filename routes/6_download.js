const { Router } = require('express')
const router = Router()
const { cleanListKeys } = require('../controllers/handleUnsafeChars')
const getFileData = require('../controllers/fileHandlers/getFileData')
const createZip = require('../controllers/fileHandlers/createZip')

router.post('/', async (req, res) => {
    const fileNamesCleaned =  cleanListKeys(req.body) //takes in list, htmlEscape keys, returns array 
    
    const targetFiles = await getFileData(fileNamesCleaned)
    
    const zipFile = await createZip(targetFiles)

    res.render('download')
})

module.exports = router