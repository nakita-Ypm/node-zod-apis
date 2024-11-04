import express from 'express'
import { ExpressHandler } from '../handler/express'

export class App {
  static init() {
    const app = express()

    const defaultPort = 3003
    const port = process.env.PORT !== undefined ? parseInt(process.env.PORT) : defaultPort
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
    this.applyHandlers(app)
  }

  static applyHandlers(app: express.Application) {
    ExpressHandler.apply(app)
  }
}
