import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ResponseService from '../services/Response.service'

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(ResponseService.failure({ message: 'Validation error', data: errors.array() }))
    }

    next()
  } catch (e) {
    console.log(e)
    next(e)
  }
}
