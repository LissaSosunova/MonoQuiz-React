import { NavLink, Outlet } from 'react-router-dom'

export default function AdminPanel() {
  return (
    <div className="w-full grid flex flex-column">
      <h1>Admin panel</h1>

      <nav className="tabs grid aling-content-center justify-content-center">
        <NavLink to="users" className="tab">
          Users
        </NavLink>
        <NavLink to="categories" className="tab">
          Categories
        </NavLink>
        <NavLink to="types" className="tab">
          Types
        </NavLink>
        <NavLink to="tests" className="tab">
          Tests
        </NavLink>
      </nav>

      <div className="tab-content grid">
        <Outlet />
      </div>
    </div>
  )
}
