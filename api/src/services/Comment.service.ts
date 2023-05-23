import { PrismaInstance } from '../../prisma/PrismaInstance'
import AppError from '../errors/AppError'

type CreateProps = {
  message: string
  confessionId: string
}

class CommentService {
  async create({ message, confessionId }: CreateProps) {
    const confession = await PrismaInstance.confession.findUnique({ where: { id: confessionId } })

    if (!confession) {
      throw new AppError(404, 'Confession not found!')
    }

    const comment = await PrismaInstance.comment.create({
      data: {
        message,
        confession: {
          connect: {
            id: confessionId,
          },
        },
      },
    })
    
    return comment
  }
}

export default new CommentService()
