import { body } from 'express-validator'

export const createCommentSchema = [
  body('message').notEmpty().isLength({ min: 20 }),
  body('confessionId').notEmpty().isLength({ min: 36, max: 36 }),
]
