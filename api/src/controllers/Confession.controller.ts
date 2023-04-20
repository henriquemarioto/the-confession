import { Request, Response } from 'express'
import ResponseService from '../services/Response.service'
import ConfessionService from '../services/Confession.service'

class ConfessionController {
  async create(req: Request, res: Response) {
    const { content } = req.body

    const confession = await ConfessionService.create(content)

    res
      .status(200)
      .json(ResponseService.success({ message: 'Confession created successfuly', data: confession }))
  }

  async findRandom(req: Request, res: Response) {
    const confessions = await ConfessionService.findRandom()

    res
      .status(200)
      .json(
        ResponseService.success({
          message: 'Confessions retrieved successfully',
          data: confessions,
        }),
      )
  }
}

export default new ConfessionController()
