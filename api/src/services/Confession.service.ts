import { PrismaInstance } from '../../prisma/PrismaInstance'

class ConfessionService {
  async create(
    title: string, 
    content: string,
    trendName: string | null,
  ): Promise<boolean> {
    const data: any = {
      title,
      content,
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

    return confessions
  }
}

export default new ConfessionService()
