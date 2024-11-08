import * as z from 'zod'

export const postSchema = z.object({
  /**
   * Unique ID of the post
   * @default {Generated by database}
   */
  id: z.string().uuid(),
  /**
   * Post content
   */
  post: z.string().min(1).max(140),
  /**
   * Post createdAt
   */
  createdAt: z.date(),
  /**
   * Post updatedAt
   */
  updatedAt: z.date(),
})
