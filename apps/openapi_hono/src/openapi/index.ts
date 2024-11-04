import { honoRoutes } from './hono'
import { postRoutes } from './post'

export const routes = {
  ...honoRoutes,
  ...postRoutes,
}
