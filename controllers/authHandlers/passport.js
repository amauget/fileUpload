const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()
const { htmlEscape } = require('../handleUnsafeChars')
const { validatePassword } = require('./passwordUtilities')


const customFields = {
    username: 'username',
    password: 'password'
}

const verifyLogin = async (username, password, done) => {
    const usernameClean = htmlEscape(username.toLowerCase())
    const passwordClean = htmlEscape(password)
    const findUser = await prisma.users.findMany({
        where: {
            username: usernameClean,
        }
    })

    try{
        const validPassword = validatePassword(passwordClean, findUser[0].password, findUser[0].salt)
        
        if(validPassword && findUser.length === 1){
           return done(null, findUser)
        }
        done(null, false)
    }
    catch(err){
        console.log('error verify login')
        done(err)
    }

}

passport.serializeUser((Session, done) => { 
    console.log(Session[0].id)
    try{
        done(null, Session)
    }catch(err){
        console.log('error serialize')
    }
})

passport.deserializeUser(async (Session, done) => {
    try{
        const id = Session[0].id
        const user = await prisma.Session.findUnique({
            where: {
                id: id
            }
        })
        
       
        if (!user) return done(null, false)

        done(null, user)
    }
    catch(err){
        console.log('error')
        console.error(err)
        done(err)
    }
})

//implement custom "verifyLogin" strategy
const loginStrategy = new LocalStrategy(customFields, verifyLogin)
loginStrategy.name = 'login'
passport.use(loginStrategy)



module.exports = passport