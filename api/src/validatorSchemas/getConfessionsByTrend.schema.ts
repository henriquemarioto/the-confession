import { param } from 'express-validator'

export const getConfessionsByTrend = [
  param('id').isString(),
]
