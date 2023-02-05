import Typography from '@mui/material/Typography'
import { COLOR } from '../../constants/themes'
import { TEXT } from '../../constants/texts'

const Header = () => {
  return (
    <Typography
      variant="h3"
      sx={{ color: COLOR.SOFT_BLACK, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      gutterBottom
    >
      {TEXT.TODO_TITLE}
    </Typography>
  )
}

export default Header
