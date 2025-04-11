const { Router } = require('express')
const router = Router()

router.use('/', require('./1_home'))
router.use('/login', require('./2_login'))
router.use('/register', require('./3_register'))
router.use('/upload', require('./4_upload'))


module.exports = router