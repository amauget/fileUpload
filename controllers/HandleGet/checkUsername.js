const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

async function checkUsername(username){
    const usernameSearch = await prisma.users.findMany({
        where:{
            username: username.toLowerCase()
        }
    }) 
    console.log(usernameSearch)
    return usernameSearch.length === 0
}
// checkUsername('Ron')
module.exports = checkUsername

