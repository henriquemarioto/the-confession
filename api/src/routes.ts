import { Router } from 'express'
import ConfessionController from './controllers/Confession.controller'
import { confessionSchema } from './validatorSchemas/confession.schema'
import validatorMiddleware from './middlewares/validator.middleware'

class Routes {
  routes: Router

  constructor() {
    this.routes = Router()
    this.createRoutes()
  }

  createRoutes() {
    this.routes.get('/is-alive', (req, res) => res.json({ message: 'The Confession is alive' }))

    this.routes.post('/create-confession', confessionSchema, validatorMiddleware, ConfessionController.create)
    this.routes.get('/get-random-confessions', ConfessionController.findRandom)
  }
}

export default new Routes().routes
