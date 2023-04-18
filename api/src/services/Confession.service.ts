import { PrismaInstance } from '../../prisma/PrismaInstance'

class ConfessionService {
  async create(content: string) {
    const confession = await PrismaInstance.confession.create({ data: { content } })
    return confession
  }
}

export default new ConfessionService()
