import { Router } from 'express'
import ConfessionController from './controllers/Confession.controller'
import { confessionSchema } from './validatorSchemas/confession.schema'
import validatorMiddleware from './middlewares/validator.middleware'
import { complaintSchema } from './validatorSchemas/complaint.schema'
import ComplaintController from './controllers/Complaint.controller'
import CommentController from './controllers/Comment.controller'
import { commentSchema } from './validatorSchemas/comment.schema'
import { TagsEnum } from './enums/Tags.enum'
import ResponseService from './services/Response.service'

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
    this.routes.post('/complaint', complaintSchema, validatorMiddleware, ComplaintController.create)
    this.routes.post('/comment', commentSchema, validatorMiddleware, CommentController.create)
  }
}

export default new Routes().routes
