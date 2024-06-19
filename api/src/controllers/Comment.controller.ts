import { Request, Response } from 'express'
import ResponseService from '../services/Response.service'
import CommentService from '../services/Comment.service'

class CommentController {
  async create(req: Request, res: Response) {
    type Props = {
      message: string
      confessionId: string
    }

    const { message, confessionId }: Props = req.body

    const confession = await CommentService.create({ message, confessionId })

    res
      .status(200)
      .json(ResponseService.success({ message: 'Confession creted successfuly', data: confession }))
  }
}

export default new CommentController()
