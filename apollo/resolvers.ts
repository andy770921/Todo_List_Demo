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
      if (tasks.some(({ name }) => name === createdName)) {
        throw new Error('same name existed')
      }
      const newTask = {
        id: lastId + 1,
        name: createdName,
      }
      data.push(newTask)
      return newTask
    },
    updateTask: async (_, { id: updatedId, name: updatedName }: Task): Promise<Task> => {
      const tasks = data
      const task = tasks.find(({ id }) => id === Number(updatedId))
      if (typeof task === 'undefined') {
        throw new Error('ID not existed')
      }

      const hasSameName = tasks.some(({ name }) => name === updatedName)
      if (hasSameName) {
        throw new Error('same name existed')
      }
      task.name = updatedName
      return task
    },
    deleteTask: async (_, { id: deletedId }: Pick<Task, 'id'>): Promise<Task> => {
      const tasks = data
      const deleteIndex = tasks.findIndex(({ id }) => id === Number(deletedId))
      if (typeof deleteIndex === 'undefined') {
        throw new Error('ID not existed')
      }
      const removedTasks = data.splice(deleteIndex, 1)
      return removedTasks[0]
    },
  },
}
