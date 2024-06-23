import { Router } from 'express'
import CommentController from './controllers/Comment.controller'
import ConfessionController from './controllers/Confession.controller'
import ReportController from './controllers/Report.controller'
import { TagsEnum } from './enums/Tags.enum'
import validatorMiddleware from './middlewares/validator.middleware'
import ResponseService from './services/Response.service'
import { createCommentSchema } from './validatorSchemas/createComment.schema'
import { createConfessionSchema } from './validatorSchemas/createConfession.schema'
import { createReportSchema } from './validatorSchemas/createReport.schema'
import { getConfessionsByTagSchema } from './validatorSchemas/getConfessionsByTag.schema'
import { getConfessionsByTrend } from './validatorSchemas/getConfessionsByTrend.schema'

class Routes {
  routes: Router

  constructor() {
    this.routes = Router()
    this.createRoutes()
  }

  createRoutes() {
    this.routes.get('/is-alive', (req, res) => res.json({ message: 'The Confession is alive' }))
    this.routes.get('/tags', (req, res) => res.json(ResponseService.success({ message: 'Tags retrieved successfully', data: Object.values(TagsEnum) })))
    this.routes.post('/confession', createConfessionSchema, validatorMiddleware, ConfessionController.create)
    this.routes.get('/confession/findRandoms', ConfessionController.findRandom)
    this.routes.get('/confession/findByTag', getConfessionsByTagSchema, validatorMiddleware, ConfessionController.findByTag)
    this.routes.get('/confession/findByTrendId/:id', getConfessionsByTrend, validatorMiddleware, ConfessionController.findByTrendId)
    this.routes.post('/report', createReportSchema, validatorMiddleware, ReportController.create)
    this.routes.post('/comment', createCommentSchema, validatorMiddleware, CommentController.create)
  }
}

export default new Routes().routes
