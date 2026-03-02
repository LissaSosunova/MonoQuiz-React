import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1D1B20',
      light: '#C3E956',
      dark: '#1F4B2C',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#C3E956'
    },
    background: {
      default: '#F8F9FA',
      paper: '#f5faf5'
    }
  }
})
