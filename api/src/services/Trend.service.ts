import { PrismaInstance } from '../../prisma/PrismaInstance'

class TrendService {
  async findById(id: string) {
    const confessions = await PrismaInstance.trend.findUnique({
      where: {
        id
      }
    })

    return confessions
  }

  async findByName(name: string) {
    const confessions = await PrismaInstance.trend.findUnique({
      where: {
        name
      }
    })

    return confessions
  }
}

export default new TrendService()
