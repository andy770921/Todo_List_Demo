import { FC } from 'react'
import MuiSnackbar, { SnackbarProps } from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import NiceModal, { useModal } from '@ebay/nice-modal-react'

const Snackbar: FC<SnackbarProps & AlertProps> = ({ message, severity }) => {
  const modal = useModal()

  return (
    <MuiSnackbar open={modal.visible} autoHideDuration={6000} onClose={modal.hide}>
      <MuiAlert onClose={modal.hide} severity={severity}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  )
}

export default NiceModal.create(Snackbar)
