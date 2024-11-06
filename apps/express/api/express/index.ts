import { makeApi } from '@zodios/core'
import { zodiosApp } from '@zodios/express'
import { z } from 'zod'

export const expressSchema = z.object({
  message: z.string(),
})

export const expressApi = makeApi([
  {
    method: 'get',
    path: '/',
    alias: 'express',
    description: 'express',
    response: expressSchema,
  },
])

export const expressRoute = zodiosApp(expressApi)
