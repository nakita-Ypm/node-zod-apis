export class ExpressHandler {
  static apply(app) {
    app.get('/', (res) => {
      res.json({ message: 'Express' })
    })
  }
}
