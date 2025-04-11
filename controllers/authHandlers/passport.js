const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { validatePassword, genPassword } = require('./passwordUtilities')
const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()
const { htmlEscape } = require('../handleUnsafeChars')


const customFields = {
    username: 'username',
    password: 'password'
}

const verifyLogin = async (username, password, done) => {
    const usernameClean = htmlEscape(username)
    const passwordClean = htmlEscape(password)

    const findUser = await prisma.users.findMany({
        where: {
            username: usernameClean,
        }
    })
    try{
        const validPassword = validatePassword(passwordClean, findUser[0].password, findUser[0].salt)
        return  validPassword && findUser.length === 1

    }
    catch(err){
        return false
    }

}

const registerUser = async (username, password, secondPassword, done) => {
    const passwordClean = htmlEscape(password)
    if(passwordClean === secondPassword){
        const { salt, hash } = genPassword(password)
        const registered = await prisma.users.create({
            data: {
                username: username,
                password: hash,
                salt: salt
            }
        })
    
        done(registered)
    }
    done(null)
 
}

passport.serializeUser((user, done) => { 
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try{
        const user = await prisma.Session.findMany({
            where: {
                id: id
            }
        })

        done(null, user[0])
    }
    catch(err){
        console.error(err)
        done(err)
        /* ADD DOM BEHAVIOR HERE */
    }
})

//implement custom "verifyLogin" strategy
const strategy = new LocalStrategy(customFields, verifyLogin, registerUser)
passport.use(strategy)

async function seeTable(){
    const output = await prisma.users.findMany()
    console.log(output) 
}
seeTable()

module.exports = passport