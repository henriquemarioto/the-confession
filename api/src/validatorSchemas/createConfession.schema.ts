import { body } from 'express-validator'
import { TagsEnum } from '../enums/Tags.enum'

export const createConfessionSchema = [
  body('title').isString().notEmpty().isLength({ min: 10, max: 80 }),
  body('content').isString().notEmpty().isLength({ min: 20, max: 240 }),
  body('trendName').isString().optional(),
  body('tag').isString().custom(async (value) => {
    if (!Object.values(TagsEnum).includes(value))
      throw new Error('Invalid Tag')
  }),
]
