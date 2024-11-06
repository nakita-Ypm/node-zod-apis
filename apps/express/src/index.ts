import { App } from '../app'

import { zodiosApp } from '@zodios/express'
import { Zodios } from '@zodios/core'
import { expressApi } from '../api/express'

const app = zodiosApp()
const expressRouter = zodiosApp(expressApi)

app.use(expressRouter)
app.get('/', (req, res) => {
  res.json({ message: 'Express' })
})

const defaultPort = 3003
const port = process.env.PORT !== undefined ? parseInt(process.env.PORT) : defaultPort
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

const apiClient = new Zodios('http://localhost:3003', expressApi)

const res = await apiClient.get('/')

console.log(res)