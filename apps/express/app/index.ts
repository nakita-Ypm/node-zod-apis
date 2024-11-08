import express from 'express'
import { ExpressHandler } from '../handler/express_handler'
import { PostHandler } from '../handler/post_handler'

export class App {
  static init() {
    const app = express()
    app.use(express.json())
    this.applyHandler(app)
    const defaultPort = 3003
    const port = process.env.PORT !== undefined ? parseInt(process.env.PORT) : defaultPort
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  }

  static applyHandler(app: express.Application) {
    ExpressHandler.apply(app)
    PostHandler.apply(app)
  }
}
