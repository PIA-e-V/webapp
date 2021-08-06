import gql from 'nanographql'
import { Query, Mutation } from '~/@types/graphql-types'

export default function () {
  return {
    async query (query: string, parameters: Record<string, any> = {}): Promise<Query> {
      const q = gql(`${query}`)

      const headers = {
        'Content-Type': 'application/json'
      }
      if (localStorage.getItem('auth-token')) {
        // @ts-ignore
        headers.Authorization = `Bearer ${localStorage.getItem('auth-token')}`
      }

      const response = await fetch('/graphql', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers,
        redirect: 'follow', // manual, *follow, error
        body: q(parameters) // body data type must match "Content-Type" header
      })

      const responseData = await response.json() as { data?: Query, errors?: Array<{ message: string }> }

      if (responseData.errors) {
        throw new Error(responseData.errors.map(e => e.message).join('\n'))
      }

      if (responseData.data) {
        return responseData.data
      }

      throw new Error('Unknown error')
    },
    async mutation (query: string, parameters: Record<string, any> = {}): Promise<Mutation> {
      const q = gql(`${query}`)

      const headers = {
        'Content-Type': 'application/json'
      }
      if (localStorage.getItem('auth-token')) {
        // @ts-ignore
        headers.Authorization = `Bearer ${localStorage.getItem('auth-token')}`
      }

      const response = await fetch('/graphql', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers,
        redirect: 'follow', // manual, *follow, error
        body: q(parameters) // body data type must match "Content-Type" header
      })

      const responseData = await response.json() as { data?: Mutation, errors?: Array<{ message: string }> }

      if (responseData.errors) {
        throw new Error(responseData.errors.map(e => e.message).join('\n'))
      }

      if (responseData.data) {
        return responseData.data
      }

      throw new Error('Unknown error')
    }
  }
}
