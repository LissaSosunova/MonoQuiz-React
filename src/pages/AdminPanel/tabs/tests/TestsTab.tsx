import { Button, Container } from '@mui/material'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function TestsTab() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  
  const navigate = useNavigate()
  const location = useLocation()

  const handleCreateTestClick = () => {
    if (location.pathname === '/admin-panel/tests/create') {
      navigate('/admin-panel/tests')
    } else {
      navigate('/admin-panel/tests/create')
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
      <Button
        onClick={handleCreateTestClick}
        variant="contained"
        size="large"
      >
        {location.pathname !== '/admin-panel/tests/create' ? 'Create Test' : 'Back to tests'}
      </Button>

      <Outlet />
    </Container>
  )
}