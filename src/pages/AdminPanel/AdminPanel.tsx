import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AdminPanel() {
  const { t } = useTranslation();
  return (
    <div className="w-full grid flex flex-column">
      <h1>{t('ADMINPANNEL.Adminpanel')}</h1>

      <nav className="tabs grid aling-content-center justify-content-center">
        <NavLink to="users" className="tab">
          {t('ADMINPANNEL.Users')}
        </NavLink>
        <NavLink to="categories" className="tab">
          {t('ADMINPANNEL.Categories')}
        </NavLink>
        <NavLink to="types" className="tab">
          {t('ADMINPANNEL.Types')}
        </NavLink>
        <NavLink to="tests" className="tab">
          {t('ADMINPANNEL.Tests')}
        </NavLink>
      </nav>

      <div className="tab-content grid">
        <Outlet />
      </div>
    </div>
  )
}
