import { Request, Response } from 'express'
import ResponseService from '../services/Response.service'
import ConfessionService from '../services/Confession.service'
import AppError from '../errors/AppError'

class ConfessionController {
  async create(req: Request, res: Response) {
    try {
      const { content, trendName } = req.body

      const confession = await ConfessionService.create(content, trendName)

      res
        .status(200)
        .json(
          ResponseService.success({ message: 'Confession created successfuly', data: confession }),
        )
    } catch (e) {
      console.log(e)
      throw new AppError(500, 'Something wrong!')
    }
  }

  async findRandom(req: Request, res: Response) {
    const confessions = await ConfessionService.findRandom()

    if (confessions.length == 0) {
      throw new AppError(404, 'No confession found!')
    }

    res.status(200).json(
      ResponseService.success({
        message: 'Confessions retrieved successfully',
        data: confessions,
      }),
    )
  }
}

export default new ConfessionController()
