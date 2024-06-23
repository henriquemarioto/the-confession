import { Request, Response } from 'express'
import ResponseService from '../services/Response.service'
import ConfessionService from '../services/Confession.service'
import AppError from '../errors/AppError'

class ConfessionController {
  async create(req: Request, res: Response) {
    try {
      const { title, content, trendName, tag } = req.body

      await ConfessionService.create(title, content, trendName, tag)

      res
        .status(200)
        .json(
          ResponseService.success({ message: 'Confession created successfuly' }),
        )
    } catch (e) {
      console.log(e)
      throw new AppError(500, 'Something wrong!')
    }
  }

  async findRandom(req: Request, res: Response) {
    const confessions = await ConfessionService.findRandom()

    res.status(200).json(
      ResponseService.success({
        message: 'Confessions retrieved successfully',
        data: confessions,
      }),
    )
  }

  async findByTag(req: Request, res: Response) {
    const { tag } = req.query
    
    const confessions = await ConfessionService.findByTag(tag as string)

    res.status(200).json(
      ResponseService.success({
        message: 'Confessions retrieved successfully',
        data: confessions,
      }),
    )
  }

  async findByTrendId(req: Request, res: Response) {
    const { id } = req.params

    const confessions = await ConfessionService.findByTrendId(id as string)

    res.status(200).json(
      ResponseService.success({
        message: 'Confessions retrieved successfully',
        data: confessions,
      }),
    )
  }
}

export default new ConfessionController()
