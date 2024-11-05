import { describe, expect, it } from 'vitest'
import {
  buildCreatePostParamsTestCases,
  buildDeletePostParamsTestCases,
  buildGetPostParamsTestCases,
  buildPutPostParamsTestCases,
  convertNumberQueryParamsTestCases,
} from '../data/post'
import { PostDomain } from '../post_domain'

describe('PostDomain Test', () => {
  // buildCreatePostParams
  it.concurrent.each(buildCreatePostParamsTestCases)('buildCreatePostParams(%s) -> %j', (post, expected) => {
    const input = PostDomain.buildCreatePostParams(post)
    expect(input).toEqual(expected)
  })
  // buildGetPostParams
  it.concurrent.each(buildGetPostParamsTestCases)('buildGetPostParams(%d, %d) -> %j', (limit, offset, expected) => {
    const input = PostDomain.buildGetPostParams(limit, offset)
    expect(input).toEqual(expected)
  })
  //   buildDeletePostParams
  it.concurrent.each(buildDeletePostParamsTestCases)('buildDeletePostParams(%s) -> %j', (id, expected) => {
    const input = PostDomain.buildDeletePostParams(id)
    expect(input).toEqual(expected)
  })
  // buildPutPostParams
  it.concurrent.each(buildPutPostParamsTestCases)('buildPutPostParams(%s) -> %j', (id, post, expected) => {
    const input = PostDomain.buildPutPostParams(id, post)
    expect(input).toEqual(expected)
  })
  // convertNumberQueryParams
  it.concurrent.each(convertNumberQueryParamsTestCases)('convertNumberQueryParams(%j) -> %j', (query, expected) => {
    const input = PostDomain.convertNumberQueryParams(query)
    expect(input).toEqual(expected)
  })
})
