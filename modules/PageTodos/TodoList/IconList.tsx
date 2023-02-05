import { FC } from 'react'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ModeEdit from '@mui/icons-material/ModeEdit'
import Check from '@mui/icons-material/Check'
import Undo from '@mui/icons-material/Undo'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  isEditing: boolean
  isUpdateLoading: boolean
  isDeleteLoading: boolean
  onSwitchEditMode: () => void
  onUpdate: () => void
  onWithdraw: () => void
  onDelete: () => void
}

const IconList: FC<Props> = ({
  isEditing,
  isUpdateLoading,
  isDeleteLoading,
  onSwitchEditMode,
  onUpdate,
  onWithdraw,
  onDelete,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      {isEditing ? (
        <>
          <IconButton onClick={onUpdate} disabled={isUpdateLoading}>
            <Check />
          </IconButton>
          <IconButton onClick={onWithdraw}>
            <Undo />
          </IconButton>
        </>
      ) : (
        <IconButton onClick={onSwitchEditMode}>
          <ModeEdit />
        </IconButton>
      )}
      <IconButton onClick={onDelete} disabled={isDeleteLoading}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  )
}

export default IconList
