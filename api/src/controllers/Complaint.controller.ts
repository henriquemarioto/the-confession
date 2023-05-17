import { Request, Response } from 'express'
import ResponseService from '../services/Response.service'
import ComplaintService from '../services/Complaint.service'
import AppError from '../errors/AppError'

interface createProps {
  reason: string
  confessionId: string
}

class ComplaintController {
  async create(req: Request, res: Response) {
    try {
      const { reason, confessionId }: createProps = req.body

      const complaint = await ComplaintService.create({ reason, confessionId })

      res
        .status(200)
        .json(
          ResponseService.success({ message: 'Complaint created successfuly', data: complaint }),
        )
    } catch (e) {
      console.log(e)
      throw new AppError(500, 'Something wrong!')
    }
  }

  async getComplaintReasons(req: Request, res: Response) {
    try {
      const complaintReasons = await ComplaintService.getComplaintReasons()
      console.log(complaintReasons)
      res
        .status(200)
        .json(
          ResponseService.success({
            message: 'Complaint reasons rescuse!',
            data: complaintReasons,
          }),
        )
    } catch (e) {
      console.log(e)
      throw new AppError(500, 'Something wrong!')
    }
  }
}

export default new ComplaintController()
