import { PrismaInstance } from '../../prisma/PrismaInstance';
import { ReportReasons } from '../enums/ReportReasons.enum';
import AppError from '../errors/AppError';

interface Props {
  reason: string
  confessionId: string
}

class ReportService {
  async create({ reason, confessionId }: Props) {
    const confession = await PrismaInstance.confession.findUnique({ where: { id: confessionId } })

    if (!confession) throw new AppError(404, 'Confession not found')

    const report = await PrismaInstance.report.create({
      data: {
        reason,
        confession: {
          connect: {
            id: confessionId,
          },
        },
      },
    })

    return report
  }

  async getReportReasons() {
    return Object.values(ReportReasons);
  }
}

export default new ReportService()
