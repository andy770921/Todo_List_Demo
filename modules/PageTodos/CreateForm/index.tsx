import { useMutation } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object as yupObject, string as yupString } from 'yup'
import NiceModal from '@ebay/nice-modal-react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import CreateButton from './CreateButton'
import { TASK_LIST_QUERY, CREATE_TASK_MUTATION } from '../../../gqls/todo'
import { TEXT } from '../../../constants/texts'
import Snackbar from '../../../components/Snackbar'

const formSchema = yupObject()
  .shape({
    name: yupString().required(TEXT.CANNOT_BE_EMPTY),
  })
  .required()

const CreateForm = () => {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(formSchema),
  })

  const [createTask, { loading }] = useMutation(CREATE_TASK_MUTATION, {
    onError: (err) => {
      NiceModal.show(Snackbar, {
        severity: 'error',
        message: `${TEXT.CREATE_TASK_FAIL}: ${err.message}`,
      })
    },
    onCompleted: (data) => {
      NiceModal.show(Snackbar, { message: `${TEXT.CREATE_TASK_SUCCESS} ${data.createTask.name}` })
      setValue('name', '')
    },
    refetchQueries: [{ query: TASK_LIST_QUERY }],
  })

  const onSubmit = ({ name }: { name: string }) => {
    createTask({
      variables: {
        name,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2} mt={2} mb={1}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField sx={{ flexGrow: 1 }} variant="standard" helperText={error?.message} error={!!error} {...field} />
          )}
        />
        <CreateButton type="submit" disabled={loading} />
      </Stack>
    </form>
  )
}

export default CreateForm
