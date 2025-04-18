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
        // console.log(findUser)

        if(validPassword && findUser.length === 1){
           return done(null, findUser[0])
        }
        done(null, false)
    }
    catch(err){
        console.log('error verify login')
        done(err)
    }

}

passport.serializeUser((user, done) => { 
    console.log(user)
    try{
        done(null, user.id)
    }catch(err){
        console.log('error serialize')
    }
})

passport.deserializeUser(async (id, done) => {
    try{
        console.log(id)
        console.log('id')
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        })
        console.log(user)
       
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