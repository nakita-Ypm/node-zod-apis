import { Prisma } from '@packages/prisma'

export type QueryValid = {
  page: string
  rows: string
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
   * @param limit
   * @param offset
   * @returns Prisma.PostFindManyArgs
   */
  static buildGetPostParams(limit: number, offset: number): Prisma.PostFindManyArgs {
    return {
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
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
   * @param rows
   * @returns { page: number; rows: number }
   */
  static convertNumberQueryParams(valid: QueryValid): { page: number; rows: number } {
    const { page, rows } = valid
    return {
      page: parseInt(page),
      rows: parseInt(rows),
    }
  }
}
