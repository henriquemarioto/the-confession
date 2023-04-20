import { body } from 'express-validator'

export const commentSchema = [
  body('message').notEmpty().isLength({ min: 20 }),
  body('confessionId').notEmpty().isLength({ min: 24, max: 24 }),
]
