import { body } from 'express-validator'
import { complaintReasons } from '../enums/complaintReasons.enum'

export const complaintSchema = [
  body('reason')
    .notEmpty()
    .custom(async (value) => {
      if (!Object.values(complaintReasons).includes(value))
        throw new Error('Complaint reason not found')
    }),
]
