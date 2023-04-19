import { Request, Response } from 'express'
import ResponseService from '../services/Response.service'
import ConfessionService from '../services/Confession.service'
import AppError from '../errors/AppError'

class ConfessionController {
  async create(req: Request, res: Response) {
    const { content } = req.body

    const confession = await ConfessionService.create(content)

    res
      .status(200)
      .json(ResponseService.success({ message: 'Confession creted successfuly', data: confession }))
  }
}

export default new ConfessionController()
