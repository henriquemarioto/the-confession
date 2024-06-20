import { Request, Response } from 'express'
import AppError from '../errors/AppError'
import ReportService from '../services/Report.service'
import ResponseService from '../services/Response.service'

interface createProps {
  reason: string
  confessionId: string
}

class ReportController {
  async create(req: Request, res: Response) {
    try {
      const { reason, confessionId }: createProps = req.body

      const report = await ReportService.create({ reason, confessionId })

      res
        .status(200)
        .json(
          ResponseService.success({ message: 'Report created successfuly', data: report }),
        )
    } catch (e) {
      console.log(e)
      throw new AppError(500, 'Something wrong!')
    }
  }

  async getReportReasons(req: Request, res: Response) {
    try {
      const ReportReasons = await ReportService.getReportReasons()

      res
        .status(200)
        .json(
          ResponseService.success({
            message: 'Report reasons rescuse!',
            data: ReportReasons,
          }),
        )
    } catch (e) {
      console.log(e)
      throw new AppError(500, 'Something wrong!')
    }
  }
}

export default new ReportController()
