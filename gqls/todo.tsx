import gql from 'graphql-tag'

export const TASK_LIST_QUERY = gql`
  {
    tasks {
      id
      name
    }
  }
`

export const CREATE_TASK_MUTATION = gql`
  mutation ($name: String!) {
    createTask(name: $name) {
      name
    }
  }
`

export const UPDATE_TASK_MUTATION = gql`
  mutation ($id: ID!, $name: String!) {
    updateTask(id: $id, name: $name) {
      id
      name
    }
  }
`

export const DELETE_TASK_MUTATION = gql`
  mutation ($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`
