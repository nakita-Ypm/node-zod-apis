import { Prisma } from '@packages/prisma'

type QueryValid = {
  page: string
  limit: string
}

export class PostDomain {
  /**
   * buildCreatePostParams
   * build Create Post Params
   * @param post
   * @returns Prisma.PostCreateArgs
   */
  static buildCreatePostParams(post: string): Prisma.PostCreateArgs {
    return {
      data: {
        post,
      },
    }
  }

  /**
   * buildGetPostParams
   * build Get Post Params
   * @param page
   * @param limit
   * @returns Prisma.PostFindManyArgs
   */
  static buildGetPostParams(page: number, limit: number): Prisma.PostFindManyArgs {
    const skip = (page - 1) * limit
    return {
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }
  }

  /**
   * buildDeletePostParams
   * build Delete Post Params
   * @param id
   * @returns Prisma.PostDeleteArgs
   */
  static buildDeletePostParams(id: string): Prisma.PostDeleteArgs {
    return {
      where: {
        id,
      },
    }
  }

  /**
   * buildPutPostParams
   * build Put Post Params
   * @param id
   * @param post
   * @returns Prisma.PostUpdateArgs
   */
  static buildPutPostParams(id: string, post: string): Prisma.PostUpdateArgs {
    return {
      where: {
        id,
      },
      data: {
        post,
      },
    }
  }

  /**
   * convertNumberQueryParams
   * convert Number Query Params
   * @param page
   * @param limit
   * @returns { page: number; limit: number }
   */
  static convertNumberQueryParams(valid: QueryValid): { page: number; limit: number } {
    const { page, limit } = valid
    return {
      page: parseInt(page),
      limit: parseInt(limit),
    }
  }
}
