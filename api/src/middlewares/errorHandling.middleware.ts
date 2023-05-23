import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'
import ResponseService from '../services/Response.service'

export default function (error: unknown, req: Request, res: Response, _: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(ResponseService.failure({
      message: error.message,
      data: error.data
    }))
  }

  console.log(error)

  return res.status(500).json(ResponseService.failure({ message: 'Internal server error!', data: {} }))
}
