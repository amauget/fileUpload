const { htmlEscape } = require('../handleUnsafeChars')
const checkUsername = require('../HandleGet/checkUsername')
const { genPassword } = require('./passwordUtilities')
const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

const registerUser = async ({ username, password, secondPassword }) => {
    try{
        const usernameClean = htmlEscape(username) //removes dangerous chars & converts to lowercase
        const passwordClean = htmlEscape(password)
        
        if(username === usernameClean && passwordClean === secondPassword){
            const validUsername = await checkUsername(usernameClean)
            if(validUsername){
                const { salt, hash } = genPassword(password)
                const registered = await prisma.users.create({
                    data: {
                        username: usernameClean.toLowerCase(), //lowercase to remove case sensitivity from username duplicate audit
                        displayedUsername: usernameClean, //shows desired username for registered user
                        password: hash,
                        salt: salt
                    }
                }) 
        
                return 'Success'
            }
            return 'Username taken'
        }
        else if(username === usernameClean && password !== secondPassword){
            return 'Passwords do not match.'
        }
        return '403... Bad user! Quit looking for unsafe character loopholes!'
    }
    catch(err){
        console.error(err)
        return false
    }
 
}

module.exports = registerUser