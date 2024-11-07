import { expressApi } from '../api/express'
import { App } from '../app'

App.init()

import { Zodios } from '@zodios/core'
const apiClient = new Zodios('http://localhost:3003', expressApi)

const res = await apiClient.get('/')

console.log(res)
