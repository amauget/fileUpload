const { htmlEscape } = require('../handleUnsafeChars')
const checkUsername = require('../HandleGet/checkUsername')
const { genPassword } = require('./passwordUtilities')
const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

const registerUser = async ({ username, password, secondPassword }) => {
    try{
        console.log(username, password, secondPassword)
        const usernameClean = htmlEscape(username.toLowerCase()) //removes dangerous chars & converts to lowercase
        const passwordClean = htmlEscape(password)
    
        const validUsername = await checkUsername(usernameClean)
    
        if(validUsername && passwordClean === secondPassword){
            const { salt, hash } = genPassword(password)
            const registered = await prisma.users.create({
                data: {
                    username: usernameClean,
                    password: hash,
                    salt: salt
                }
            }) 
            console.log(registered)
            console.log("registered variable^^^")
            return true
        }
        return false
    }
    catch(err){
        console.error(err)
        return false
    }
 
}

module.exports = registerUser