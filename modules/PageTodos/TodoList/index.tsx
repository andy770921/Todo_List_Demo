import { FC, Fragment } from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { TEXT } from '../../../constants/texts'
import { COLOR } from '../../../constants/themes'
import { TaskListResponse } from '../../../gqls/todo'
import Todo from './Todo'

const TodoList: FC<Pick<TaskListResponse, 'tasks'>> = ({ tasks }) => {
  return (
    <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
      {tasks?.length ? (
        tasks.map(({ id, name }, idx) => (
          <Fragment key={id}>
            <Todo id={id} order={idx + 1} name={name} />
            {idx < tasks.length - 1 && <Divider />}
          </Fragment>
        ))
      ) : (
        <Paper sx={{ padding: '12px 20px' }}>
          <Typography variant="subtitle1" sx={{ color: COLOR.SOFT_BLACK, margin: 0 }} gutterBottom>
            {TEXT.EMPTY_TODO_LIST}
          </Typography>
        </Paper>
      )}
    </List>
  )
}

export default TodoList
