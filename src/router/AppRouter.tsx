import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthGuard from '../guards/AuthGuard'

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
            <AuthGuard>
              <AdminPanel />
            </AuthGuard>
          }
        />

        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Suspense>
  )
}
