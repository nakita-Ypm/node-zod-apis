import e, { query } from 'express'
import { createPost, deletePost, expressApi, getPostList, updatePost } from '../api'
import { App } from '../app'

App.init()

import { Zodios } from '@zodios/core'

const expressApiClient = new Zodios('http://localhost:3003', expressApi)
const createPostApiClient = new Zodios('http://localhost:3003/', createPost)
const getPostListApiClient = new Zodios('http://localhost:3003/', getPostList)
const deletePostApiClient = new Zodios('http://localhost:3003/', deletePost)
const updatePostApiClient = new Zodios('http://localhost:3003/', updatePost)

const expressRes = await expressApiClient.get('/')
console.log(expressRes)

const createPostRes = await createPostApiClient.createPost({
  post: 'Express Zodios',
})
console.log(createPostRes)

// const getPostListRes = await getPostListApiClient.getPostList({
//   queries: {
//     query: {
//       page: '1',
//       rows: '10',
//     },
//   },
// })

// console.log(getPostListRes)

// const deleteRes = await deletePostApiClient.deletePost({
//   params: {
//     id: '1',
//   },
// })

// const deleteRes = postApiClient.deletePost({
//   params: {
//     id: '1',
//   },
// })
// console.log(deleteRes)

// const post_res = await updatePostApiClient.updatePost({

// })
