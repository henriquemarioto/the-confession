import { body } from 'express-validator'
import { ReportReasons } from '../enums/ReportReasons.enum'

export const createReportSchema = [
  body('reason')
    .notEmpty()
    .custom(async (value) => {
      if (!Object.values(ReportReasons).includes(value))
        throw new Error('Report reason not found')
    }),
]
