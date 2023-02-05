import { initializeApollo } from '../apollo/client'
import { TASK_LIST_QUERY } from '../gqls/todo'
import PageTodos from '../modules/PageTodos'

const Index = () => {
  return <PageTodos />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: TASK_LIST_QUERY,
    fetchPolicy: 'no-cache',
    // Ref: https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
