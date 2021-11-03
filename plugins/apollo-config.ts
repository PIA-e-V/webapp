import { ApolloClientConfig } from '@nuxtjs/apollo/types/nuxt'
import possibleTypes from '~/@types/possible-graphql-types'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { Context } from '@nuxt/types'

export default (context: Context) => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: possibleTypes
  })

  return {
    httpEndpoint: context.env.apiBaseUrl,
    // override HTTP endpoint in browser only
    browserHttpEndpoint: context.env.apiBaseUrl + '/graphql',
    inMemoryCacheOptions: {
      fragmentMatcher
    }
  } as ApolloClientConfig
}
