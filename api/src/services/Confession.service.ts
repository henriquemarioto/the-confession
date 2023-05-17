import { PrismaInstance } from '../../prisma/PrismaInstance'
import AppError from '../errors/AppError'

class ConfessionService {
  async create(content: string) {
    const confession = await PrismaInstance.confession.create({ data: { content } })
    return confession
  }

  async findRandom() {
    const confessionNumberToTake = 10
    const confessionCount = await PrismaInstance.confession.count()
    const confessionsToSkip = Math.floor(
      Math.random() * (Math.floor(confessionCount - confessionNumberToTake) - Math.ceil(0)) +
        Math.ceil(0),
    )

    const confessions = await PrismaInstance.confession.findMany({
      take: confessionNumberToTake,
      skip: confessionsToSkip < 0 ? 0 : confessionsToSkip,
      include: {
        comments: true,
      },
    })

    if (confessions.length == 0) {
      throw new AppError(404, 'No confession found!')
    }

    return confessions
  }
}

export default new ConfessionService()
