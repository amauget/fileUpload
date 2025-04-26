const { Router } = require('express')
const router = Router()
const { htmlEscape } = require('../controllers/handleUnsafeChars')
const getFileData = require('../controllers/fileHandlers/getFileData')
const streamFile = require('../controllers/fileHandlers/streamFile')



router.get('/', async (req, res) => {
    const cleanFileName = htmlEscape(req.query.id)   
    const targetFile = await getFileData([cleanFileName], req.user)
    await streamFile(res, targetFile[0])
})

module.exports = router