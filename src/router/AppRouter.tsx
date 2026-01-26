import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthGuard from '../guards/AuthGuard'
import AdminGuard from '../guards/AdminGuard'
import UsersTab from '../pages/AdminPanel/tabs/UsersTab'
import CategoriesTab from '../pages/AdminPanel/tabs/CategoriesTab'
import TestsTab from '../pages/AdminPanel/tabs/TestsTab'
import TypesTab from '../pages/AdminPanel/tabs/TypesTab'

const Home = lazy(() => import('../pages/Home/Home'))
const Categories = lazy(() => import('../pages/Categories/Categories'))
const Tests = lazy(() => import('../pages/Tests/Tests'))
const Test = lazy(() => import('../pages/Test/Test'))
const Contacts = lazy(() => import('../pages/Contacts/Contacts'))
const AdminPanel = lazy(() => import('../pages/AdminPanel/AdminPanel'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/tests" element={<Tests />} />

        {/* guarded routes */}
        <Route
          path="/test"
          element={
            <AuthGuard>
              <Test />
            </AuthGuard>
          }
        />

        <Route path="/contacts" element={<Contacts />} />

        <Route
          path="/admin-panel"
          element={
            <AdminGuard>
              <AdminPanel />
            </AdminGuard>
          }
        >
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<UsersTab />} />
          <Route path="categories" element={<CategoriesTab />} />
          <Route path="types" element={<TypesTab />} />
          <Route path="tests" element={<TestsTab />} />
        </Route>


        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Suspense>
  )
}
