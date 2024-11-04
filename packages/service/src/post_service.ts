import { Post, Prisma, prisma } from '@packages/prisma'
import { PostDomain } from '@packages/domain'

export class PostService {
  /**
   * createPost
   * 投稿を作成する
   * @param post
   * @returns Promise<Post>
   */
  static async createPost(post: string): Promise<Post> {
    const data: Prisma.PostCreateArgs = PostDomain.buildCreatePostParams(post)
    return await prisma.post.create(data)
  }

  /**
   * getPosts
   * get Post List
   * @param page
   * @param limit
   * @returns Promise<Post[]>
   */
  static async getPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    const data: Prisma.PostFindManyArgs = PostDomain.buildGetPostParams(page, limit)
    return await prisma.post.findMany(data)
  }

  /**
   * deletePost
   * delete Post
   * @param id
   * @returns Promise<Post>
   */
  static async deletePost(id: string): Promise<Post> {
    const data: Prisma.PostDeleteArgs = PostDomain.buildDeletePostParams(id)
    return await prisma.post.delete(data)
  }

  /**
   * putPost
   * put Post
   * @param id
   * @param post
   * @returns Promise<Post>
   */
  static async putPost(id: string, post: string): Promise<Post> {
    const data: Prisma.PostUpdateArgs = PostDomain.buildPutPostParams(id, post)
    return await prisma.post.update(data)
  }
}
