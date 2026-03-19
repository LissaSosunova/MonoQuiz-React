import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function TestsTab() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleCreateTestClick = () => {
    if (location.pathname === '/admin-panel/tests/create') {
      navigate('/admin-panel/tests/all')
    } else {
      navigate('/admin-panel/tests/create')
    }
  }

  return (
    <>
      <div className="w-full flex justify-content-center grid pt-2 pb-2">
        <button
          className="btn-main primary-btn mt-3"
          onClick={() => handleCreateTestClick()}
        >
          {location.pathname !== '/admin-panel/tests/create' ? '+ Add Test' : 'Back to tests'}
        </button>
      </div>
      <Outlet />
    </>
  )
}