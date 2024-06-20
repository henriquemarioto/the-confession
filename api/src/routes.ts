import { Router } from 'express'
import CommentController from './controllers/Comment.controller'
import ConfessionController from './controllers/Confession.controller'
import ReportController from './controllers/Report.controller'
import { TagsEnum } from './enums/Tags.enum'
import validatorMiddleware from './middlewares/validator.middleware'
import ResponseService from './services/Response.service'
import { commentSchema } from './validatorSchemas/comment.schema'
import { confessionSchema } from './validatorSchemas/confession.schema'
import { reportSchema } from './validatorSchemas/report.schema'

class Routes {
  routes: Router

  constructor() {
    this.routes = Router()
    this.createRoutes()
  }

  createRoutes() {
    this.routes.get('/is-alive', (req, res) => res.json({ message: 'The Confession is alive' }))
    this.routes.get('/tags', (req, res) => res.json(ResponseService.success({ message: 'Tags retrieved successfully', data: Object.values(TagsEnum) })))
    this.routes.post('/confession', confessionSchema, validatorMiddleware, ConfessionController.create)
    this.routes.get('/confession/findRandoms', ConfessionController.findRandom)
    this.routes.post('/report', reportSchema, validatorMiddleware, ReportController.create)
    this.routes.post('/comment', commentSchema, validatorMiddleware, CommentController.create)
  }
}

export default new Routes().routes
