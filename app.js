import express, { json } from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies.js'

const app = express()
app.use(json())
app.use(cors()) // permitir el acceso desde el navegador!
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})
