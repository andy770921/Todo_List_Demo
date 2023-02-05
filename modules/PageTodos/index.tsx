import { useQuery } from '@apollo/client'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'
import { TASK_LIST_QUERY, TaskListResponse } from '../../gqls/todo'
import { COLOR } from '../../constants/themes'
import Header from './Header'
import TodoList from './TodoList'
import CreateForm from './CreateForm'

const Index = () => {
  const { data: { tasks } = {}, loading } = useQuery<TaskListResponse>(TASK_LIST_QUERY)

  return (
    <Box sx={{ bgcolor: COLOR.DARK_GREY, height: '100vh' }} pt={4}>
      <Container maxWidth="sm">
        <Header />
        <CreateForm />
        {loading ? <Skeleton variant="rectangular" width="100%" height={48} /> : <TodoList tasks={tasks} />}
      </Container>
    </Box>
  )
}

export default Index
