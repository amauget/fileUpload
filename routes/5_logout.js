const { Router } = require('express')
const router = Router()

router.get('/', async(req, res, next) => {
    try{
      req.logout((err) => { // passport built-in
        if (err) {
          return next(err)
        }
        
        res.redirect('/')
      })
    }catch(err){
      console.error(err)
      res.redirect('/error')
    }
  })

module.exports = router