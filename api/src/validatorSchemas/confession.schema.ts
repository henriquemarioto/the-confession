import { body } from 'express-validator'

export const confessionSchema = [body('content').notEmpty().isLength({ min: 20 })]
