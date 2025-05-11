const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()


async function seeTable(){
  const output = await prisma.users.findMany({
    where: {
      username: 'amauget'
    }
  })
  const userFiles = await prisma.userFiles.findMany(({
    where: {
      username: 'amauget'
    }
  }))
  console.log(output)
  console.log(userFiles) 
}
// seeTable()


async function clearDatabase() {
  try {
    // await prisma.Session.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.userFiles.deleteMany({})
    // Add deleteMany calls for all your other models
    console.log('Successfully cleared all tables.');
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}
// clearDatabase()
