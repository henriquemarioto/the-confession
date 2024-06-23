import AppError from '../errors/AppError'
import { PrismaInstance } from '../../prisma/PrismaInstance'

class ConfessionService {
  async create(
    title: string, 
    content: string,
    trendName: string | null,
    tag: string,
  ): Promise<boolean> {
    const data: any = {
      title,
      content,
      tag,
    }

    if (trendName) {
      data.trend = {
        connectOrCreate: {
          where: { name: trendName },
          create: { name: trendName },
        },
      }
    }

    await PrismaInstance.confession.create({
      data,
    })

    return true
  }

  async findRandom() {
    const confessionNumberToTake = 10

    const confessionCount =
      await PrismaInstance.confession.count()

    const confessionsToSkip = Math.floor(
      Math.random() *
        (Math.floor(
          confessionCount -
            confessionNumberToTake,
        ) -
          Math.ceil(0)) +
        Math.ceil(0),
    )

    const confessions =
      await PrismaInstance.confession.findMany({
        take: confessionNumberToTake,
        skip:
          confessionsToSkip < 0
            ? 0
            : confessionsToSkip,
        include: {
          comments: true,
          trend: true,
        },
      })

    if (confessions.length == 0) {
      throw new AppError(404, 'No confessions found!')
    }

    return confessions
  }

  async findByTag(tag: string) {
    const confessions =
      await PrismaInstance.confession.findMany({
        where: {
          tag,
        },
        include: {
          comments: true,
          trend: true,
        },
      })

    if (confessions.length == 0) {
      throw new AppError(404, 'No confessions found!')
    }

    return confessions
  }

  async findByTrendId(id: string) {
    const confessions =
      await PrismaInstance.confession.findMany({
        where: {
          trend: {
            id,
          }
        },
        include: {
          comments: true,
          trend: true,
        },
      })

    if (confessions.length == 0) {
      throw new AppError(404, 'No confessions found!')
    }

    return confessions
  }
}

export default new ConfessionService()
