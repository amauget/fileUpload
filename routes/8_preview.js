const { Router } = require('express')
const router = Router()
const { htmlEscape } = require('../controllers/handleUnsafeChars')
const getFileData = require('../controllers/fileHandlers/getFileData')
const streamFile = require('../controllers/fileHandlers/streamFile')



router.get('/', async (req, res) => {
    const cleanFileName = htmlEscape(req.query.id)
    const { targetFiles, fileType }  = await getFileData([cleanFileName], req.user)
  
    await streamFile(res, targetFiles[0], fileType)
})

module.exports = router