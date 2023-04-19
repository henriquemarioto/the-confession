import { Router } from 'express'
import ConfessionController from './controllers/Confession.controller'
import { confessionSchema } from './validatorSchemas/confession.schema'
import validatorMiddleware from './middlewares/validator.middleware'
import CommentController from './controllers/Comment.controller'
import { commentSchema } from './validatorSchemas/comment.schema'

class Routes {
  routes: Router

  constructor() {
    this.routes = Router()
    this.createRoutes()
  }

  createRoutes() {
    this.routes.get('/is-alive', (req, res) => res.json({ message: 'The Confession is alive' }))

    this.routes.post('/create-confession', confessionSchema, validatorMiddleware, ConfessionController.create)
    this.routes.post('/comment-on-confession', commentSchema, validatorMiddleware, CommentController.create)
  }
}

export default new Routes().routes
