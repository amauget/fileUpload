const { Router } = require('express')
const router = Router()


router.use('/', require('./1_home'))
router.use('/login', require('./2_login'))
router.use('/register', require('./3_register'))
router.use('/upload', require('./4_upload'))
router.use('/logout', require('./5_logout'))
router.use('/download', require('./6_download'))
router.use('/error', require('./7_error'))
router.use('/preview', require('./8_preview'))


module.exports = router