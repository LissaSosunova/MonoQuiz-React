import { useEffect, useState } from 'react'
import { CategoriesAPI } from '../../../../api/categories.api'
import { type Type } from '../../../../shared/interfaces/types'
import { CategoryRow } from './CategoryRow'
import { NewCategoryRow } from './NewCategoryRow'
import { showToast } from '../../../../shared/ui/toast'

export default function TypesTab() {
  const [types, setTypes] = useState<Type[]>([])
  const [creating, setCreating] = useState(false)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  useEffect(() => {
    CategoriesAPI.getAll().then(res => setTypes(res.data))
  }, [])

  const handleSaveRow = async (updated: Type) => {
    try {
      setLoadingId(updated._id!)
      const res = await CategoriesAPI.edit(updated._id!, {
        slug: updated.slug,
        translations: updated.translations
      })

      setTypes(prev =>
        prev.map(t => (t._id === updated._id ? res.data : t))
      )

      showToast.success('Saved')
    } catch (e: any) {
      showToast.error(e?.response?.data?.message || 'Save failed')
    } finally {
      setLoadingId(null)
    }
  }

  const handleCreate = async (data: Type) => {
    try {
      const res = await CategoriesAPI.create(data)

      setTypes(prev => [res.data, ...prev])
      setCreating(false)

      showToast.success('Type created')
    } catch (e: any) {
      showToast.error(e?.response?.data?.message || 'Create failed')
    }
  }

  return (
    <>
      <div className="w-full flex justify-content-center grid pt-2 pb-2">
        <button
          className="btn-main primary-btn mt-3"
          onClick={() => setCreating(true)}
          disabled={creating}
        >
          + Add category
        </button>
      </div>
      <div className="w-full flex justify-content-center grid pt-5 pb-5">

        <table className="types-table lg:col-8 md:col-10 col-12 justify-content-center align-items-center">
          <thead>
            <tr>
              <th>Slug</th>
              <th>UA</th>
              <th>EN</th>
              <th>RU</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {creating && (
              <NewCategoryRow
                onSave={handleCreate}
                onCancel={() => setCreating(false)}
              />
            )}

            {types.map(type => (
              <CategoryRow
                key={type._id}
                type={type}
                onSave={handleSaveRow}
                isSaving={loadingId === type._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
