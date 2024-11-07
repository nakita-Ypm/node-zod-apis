import express from 'express'

// type Context = {
//   req: express.Request
//   res: express.Response
// }

export class ExpressHandler {
  static apply(app: express.Application) {
    app.get('/', this.express)
  }

  static express(req: express.Request, res: express.Response) {
    res.json({ message: 'Express' })
  }
}
