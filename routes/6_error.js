const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('<h1>Error</h1><a href="/">Go Home</a>')
})