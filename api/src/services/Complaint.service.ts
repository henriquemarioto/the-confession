import { complaintReasons } from './../enums/complaintReasons.enum';
import { PrismaInstance } from '../../prisma/PrismaInstance'
import AppError from '../errors/AppError'

interface Props {
  reason: string
  confessionId: string
}

class ComplaintService {
  async create({ reason, confessionId }: Props) {
    const confession = await PrismaInstance.confession.findUnique({ where: { id: confessionId } })

    if (!confession) throw new AppError(404, 'Confession not found')

    const complaint = await PrismaInstance.complaint.create({
      data: {
        reason,
        confession: {
          connect: {
            id: confessionId,
          },
        },
      },
    })

    return complaint
  }

  async getComplaintReasons() {
    return Object.values(complaintReasons);
  }
}

export default new ComplaintService()
