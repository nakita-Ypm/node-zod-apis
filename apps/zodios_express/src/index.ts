import express from 'express'
import { Zodios } from '@zodios/core'
import { zodiosApp } from '@zodios/express'
import { expressApi } from './api/express'

const app = zodiosApp()
const port = 3004
const expressRouter = zodiosApp(expressApi)

app.use(expressRouter)
app.get('/', async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Zodios Express' })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

const apiClient = new Zodios('http://localhost:3004', expressApi)

const expressRes = await apiClient.express()
console.log(expressRes)
