import { zodiosApp } from '@zodios/express'
import { expressApi } from './api'

const app = zodiosApp()
const port = 3004
const expressRouter = zodiosApp(expressApi)

app.use(expressRouter)
app.get('/', (req, res) => {
  res.json({ message: 'Zodios Express' })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
