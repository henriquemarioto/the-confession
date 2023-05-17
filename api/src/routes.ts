import { Router } from 'express'
import ConfessionController from './controllers/Confession.controller'
import { confessionSchema } from './validatorSchemas/confession.schema'
import validatorMiddleware from './middlewares/validator.middleware'
import { complaintSchema } from './validatorSchemas/complaint.schema'
import ComplaintController from './controllers/Complaint.controller'
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
    this.routes.post('/create-complaint', complaintSchema, validatorMiddleware, ComplaintController.create)
    this.routes.get('/get-complaint-reasons', ComplaintController.getComplaintReasons)
    this.routes.get('/get-random-confessions', ConfessionController.findRandom)
    this.routes.post('/comment-on-confession', commentSchema, validatorMiddleware, CommentController.create)
  }
}

export default new Routes().routes
