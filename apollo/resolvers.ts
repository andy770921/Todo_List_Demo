import { Task } from './type-defs'

const data = [{ id: 1, name: 'study' }]

export const resolvers = {
  Query: {
    tasks: async (): Promise<Task[]> => {
      return data
    },
  },
  Mutation: {
    createTask: async (_, { name: createdName }: Pick<Task, 'name'>): Promise<Task> => {
      const tasks = data
      const lastId = tasks.length ? tasks[tasks.length - 1].id : 0
      if (!tasks.some(({ name }) => name === createdName)) {
        const newTask = {
          id: lastId + 1,
          name: createdName,
        }
        data.push(newTask)
        return newTask
      } else {
        throw new Error('Task with same name existed')
      }
    },
    updateTask: async (_, { id: updatedId, name: updatedName }: Task): Promise<Task> => {
      const tasks = data
      const task = tasks.find(({ id }) => id === Number(updatedId))
      if (typeof task !== 'undefined') {
        task.name = updatedName
        return task
      } else {
        throw new Error('ID not existed')
      }
    },
    deleteTask: async (_, { id: deletedId }: Pick<Task, 'id'>): Promise<Task> => {
      const tasks = data
      const deleteIndex = tasks.findIndex(({ id }) => id === Number(deletedId))
      if (typeof deleteIndex !== 'undefined') {
        const removedTasks = data.splice(deleteIndex, 1)
        return removedTasks[0]
      } else {
        throw new Error('ID not existed')
      }
    },
  },
}
