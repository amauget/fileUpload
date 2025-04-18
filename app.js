const express = require('express')
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient()

const path = require('path')
const passport = require('./controllers/authHandlers/passport')
const app = express()
const router = require('./routes/0_router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Express Session w/ PrismaSessionStore
app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
)

app.use(passport.session())

const assetPath = path.join(__dirname, 'public')
app.use(express.static(assetPath))

//EJS
app.set('view engine', 'ejs')
app.set('veiw', path.join(__dirname, 'views'))


app.use('/', router)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
   
})

// async function seeTable(){
//   const output = await prisma.users.findMany()
//   console.log(output) 
// }
// seeTable()


// async function clearDatabase() {
//   try {
//     await prisma.Session.deleteMany({});
//     await prisma.users.deleteMany({});
//     // Add deleteMany calls for all your other models
//     console.log('Successfully cleared all tables.');
//   } catch (error) {
//     console.error('Error clearing database:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// clearDatabase()