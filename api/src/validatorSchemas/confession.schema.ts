import { body } from 'express-validator'

export const confessionSchema = [
  body('title').notEmpty().isLength({ min: 10, max: 80 }),
  body('content').notEmpty().isLength({ min: 20, max: 240 }),
  body('trendName').isString().optional(),
]
