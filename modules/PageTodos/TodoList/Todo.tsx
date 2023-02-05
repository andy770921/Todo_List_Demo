import { FC, useState } from 'react'
import { useMutation } from '@apollo/client'
import NiceModal from '@ebay/nice-modal-react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object as yupObject, string as yupString } from 'yup'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import { TASK_LIST_QUERY, UPDATE_TASK_MUTATION, DELETE_TASK_MUTATION } from '../../../gqls/todo'
import { COLOR } from '../../../constants/themes'
import { Task } from '../../../apollo/type-defs'
import { TEXT } from '../../../constants/texts'
import Snackbar from '../../../components/Snackbar'
import IconList from './IconList'

interface Props {
  order: number
  id: Task['id']
  name: Task['name']
}

const Todo: FC<Props> = ({ id, order, name }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      updatedName: name,
    },
    resolver: yupResolver(
      yupObject()
        .shape({
          updatedName: yupString()
            .required(TEXT.CANNOT_BE_EMPTY)
            .test('nameDuplicated', TEXT.NAME_DUPLICATED, (value) => value !== name),
        })
        .required()
    ),
  })

  const [updateTask, { loading: isUpdateLoading }] = useMutation(UPDATE_TASK_MUTATION, {
    onError: (err) => {
      NiceModal.show(Snackbar, {
        severity: 'error',
        message: `${TEXT.UPDATE_TASK_FAIL} ${err.message}`,
      })
    },
    onCompleted: (data) => {
      NiceModal.show(Snackbar, { message: `${TEXT.UPDATE_TASK_SUCCESS} ${data.updateTask.name}` })
      setIsEditing((prevMode) => !prevMode)
    },
    refetchQueries: [{ query: TASK_LIST_QUERY }],
  })

  const [deleteTask, { loading: isDeleteLoading }] = useMutation(DELETE_TASK_MUTATION, {
    onError: (err) => {
      NiceModal.show(Snackbar, {
        severity: 'error',
        message: `${TEXT.DELETE_TASK_FAIL} ${err.message}`,
      })
    },
    onCompleted: () => {
      NiceModal.show(Snackbar, { message: `${TEXT.DELETE_TASK_SUCCESS}` })
    },
    refetchQueries: [{ query: TASK_LIST_QUERY }],
  })

  const onSwitchEditMode = () => setIsEditing((prevMode) => !prevMode)

  const onWithdraw = () => {
    setIsEditing((prevMode) => !prevMode)
    reset({
      updatedName: name,
    })
  }

  const onUpdate = ({ updatedName }: { updatedName: string }) => {
    updateTask({
      variables: {
        id,
        name: updatedName,
      },
    })
  }

  const handleDelete = () => {
    deleteTask({
      variables: {
        id,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <ListItem
        sx={{ bgcolor: COLOR.WHITE }}
        secondaryAction={
          <IconList
            isEditing={isEditing}
            isUpdateLoading={isUpdateLoading}
            isDeleteLoading={isDeleteLoading}
            onSwitchEditMode={onSwitchEditMode}
            onWithdraw={onWithdraw}
            onUpdate={handleSubmit(onUpdate)}
            onDelete={handleDelete}
          />
        }
      >
        <Avatar
          sx={{ width: 24, height: 24, fontSize: '16px', bgcolor: COLOR.GREY, marginRight: '12px' }}
          variant="rounded"
        >
          {order}
        </Avatar>
        {isEditing ? (
          <Controller
            name="updatedName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                sx={{ width: '50%' }}
                variant="standard"
                helperText={error?.message}
                error={!!error}
                {...field}
              />
            )}
          />
        ) : (
          <ListItemText primary={name} />
        )}
      </ListItem>
    </form>
  )
}

export default Todo
