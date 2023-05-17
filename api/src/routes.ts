import { Router } from 'express'
import ConfessionController from './controllers/Confession.controller'
import { confessionSchema } from './validatorSchemas/confession.schema'
import validatorMiddleware from './middlewares/validator.middleware'
import { complaintSchema } from './validatorSchemas/complaint.schema'
import ComplaintController from './controllers/Complaint.controller'

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
  }
}

export default new Routes().routes
