import { zodiosApp } from '@zodios/express'
import { expressRoute } from '../api/express'
import { ExpressHandler } from '../handler/express_handler'

export class App {
  static init() {
    const app = zodiosApp()
    this.applyRoutes(app)
    this.applyHandler(app)
    const defaultPort = 3003
    const port = process.env.PORT !== undefined ? parseInt(process.env.PORT) : defaultPort
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  }

  static applyHandler(app) {
    ExpressHandler.apply(app)
  }

  static applyRoutes(app) {
    app.use(expressRoute)
  }
}
