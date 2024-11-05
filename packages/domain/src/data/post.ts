import { Post, Prisma } from '@packages/prisma'
import { QueryValid } from '../post_domain'

// Sample Data
const postDatas: Post[] = [
  {
    id: 'post_id_1',
    post: 'Content 1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'post_id_2',
    post: 'post 2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'post_id_3',
    post: 'post 3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]

// generatePostDatas
const generatePostDatas = (count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `post_id_${i + 1}`,
    post: `Content ${i + 1}`,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  }))
}

// buildCreatePostParams
export const buildCreatePostParamsTestCases: [string, Prisma.PostCreateArgs][] = generatePostDatas(100).map((i) => [
  i.post,
  {
    data: {
      post: i.post,
    },
  },
])

// buildGetPostParams
export const buildGetPostParamsTestCases: [number, number, Prisma.PostFindManyArgs][] = [
  [10, 0, { skip: 0, take: 10, orderBy: { createdAt: 'desc' } }],
  [10, 10, { skip: 10, take: 10, orderBy: { createdAt: 'desc' } }],
  [10, 20, { skip: 20, take: 10, orderBy: { createdAt: 'desc' } }],
]

// buildDeletePostParams
export const buildDeletePostParamsTestCases: [string, Prisma.PostDeleteArgs][] = generatePostDatas(100).map((i) => [
  i.id,
  {
    where: {
      id: i.id,
    },
  },
])

// buildPutPostParams
export const buildPutPostParamsTestCases: [string, string, Prisma.PostUpdateArgs][] = generatePostDatas(100).map(
  (i) => [
    i.id,
    i.post,
    {
      where: {
        id: i.id,
      },
      data: {
        post: i.post,
      },
    },
  ],
)

// convertNumberQueryParams
const queryValidDatas: QueryValid[] = [
  { page: '1', rows: '10' },
  { page: '2', rows: '10' },
  { page: '3', rows: '10' },
]

export const convertNumberQueryParamsTestCases: [QueryValid, { page: number; rows: number }][] = queryValidDatas.map(
  (i) => [
    i,
    {
      page: Number(i.page),
      rows: Number(i.rows),
    },
  ],
)
