import { query } from 'express-validator'
import { TagsEnum } from '../enums/Tags.enum'

export const getConfessionsByTagSchema = [
  query('tag').isString().custom(async (value) => {
    if (!Object.values(TagsEnum).includes(value))
      throw new Error('Invalid Tag')
  }),
]
