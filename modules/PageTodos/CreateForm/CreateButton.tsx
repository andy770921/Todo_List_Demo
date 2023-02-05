import { FC } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import { TEXT } from '../../../constants/texts'

const CreateButton: FC<ButtonProps> = (props) => {
  return (
    <Button sx={{ height: '36px' }} variant="contained" endIcon={<AddCircleOutline />} {...props}>
      {TEXT.CREATE_BUTTON}
    </Button>
  )
}

export default CreateButton
