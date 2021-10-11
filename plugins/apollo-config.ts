import { ApolloClientConfig } from '@nuxtjs/apollo/types/nuxt'
import possibleTypes from '~/@types/possible-graphql-types'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

export default (context: any) => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: possibleTypes
  })

  return {
    httpEndpoint: 'http://ftv.localhost',
    // override HTTP endpoint in browser only
    browserHttpEndpoint: '/graphql',
    inMemoryCacheOptions: {
      fragmentMatcher
    }
  } as ApolloClientConfig
}
