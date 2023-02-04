import { useQuery, useMutation } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { TASK_LIST_QUERY, CREATE_TASK_MUTATION, UPDATE_TASK_MUTATION, DELETE_TASK_MUTATION } from '../gqls/todo'

const Index = () => {
  const {
    data: { tasks },
  } = useQuery(TASK_LIST_QUERY)
  const [createTask] = useMutation(CREATE_TASK_MUTATION, {
    onCompleted: (data) => {
      console.log('create data', data)
    },
    refetchQueries: [{ query: TASK_LIST_QUERY }],
  })
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: (data) => {
      console.log('update data', data)
    },
    refetchQueries: [{ query: TASK_LIST_QUERY }],
  })
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: (data) => {
      console.log('delete data', data)
    },
    refetchQueries: [{ query: TASK_LIST_QUERY }],
  })

  return (
    <>
      <button
        onClick={() =>
          createTask({
            variables: {
              name: 'walk',
            },
          })
        }
      >
        create
      </button>
      <button
        onClick={() =>
          updateTask({
            variables: {
              id: 1,
              name: 'sleep',
            },
          })
        }
      >
        update
      </button>
      <button
        onClick={() =>
          deleteTask({
            variables: {
              id: 1,
            },
          })
        }
      >
        delete
      </button>
      {tasks &&
        tasks.map(({ id, name }) => (
          <div key={id}>
            Your task name is {name} and task id is {id}
          </div>
        ))}
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: TASK_LIST_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
