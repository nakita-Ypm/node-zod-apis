import { Post, Prisma, prisma } from '@packages/prisma'
import { PostDomain } from '@packages/domain'

export class PostService {
  /**
   * createPost
   * create Post
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
   * @param limit
   * @param offset
   * @returns Promise<Post[]>
   */
  static async getPosts(limit: number = 0, offset: number = 10): Promise<Post[]> {
    const data: Prisma.PostFindManyArgs = PostDomain.buildGetPostParams(limit, offset)
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
