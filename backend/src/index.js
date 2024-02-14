import express from 'express'
import cors from 'cors'; 
import usersRoutes from './routes/index.routes.js'
import indexRoutes from './routes/users.routes.js'

const app = express()

app.use(cors());

app.use(express.json())

app.use(indexRoutes)
app.use(usersRoutes)

app.listen(5000)
console.log('Server running on port 5000')