import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Task {
    id: ID!
    name: String!
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(name: String!): Task
    updateTask(id: ID!, name: String!): Task
    deleteTask(id: ID!): Task
  }
`

export interface Task {
  id: number
  name: string
}
