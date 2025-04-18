const { Router } = require('express')
const router = Router()

router.use('/', require('./1_home'))
router.use('/login', require('./2_login'))
router.use('/register', require('./3_register'))
router.use('/upload', require('./4_upload'))
router.use('/logout', require('./5_logout'))
router.use('/error', require('./6_error'))

module.exports = router