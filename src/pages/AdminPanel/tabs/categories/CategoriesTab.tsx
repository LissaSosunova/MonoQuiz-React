import { useState } from 'react'
import { CategoriesAPI } from '../../../../api/categories.api'
import { type Type } from '../../../../shared/interfaces/types'
import { CategoryRow } from './CategoryRow'
import { NewCategoryRow } from './NewCategoryRow'
import { showToast } from '../../../../shared/ui/toast'
import { languages, type Language } from '../../../../shared/interfaces/translations'
import { useContext } from 'react'
import { DictionaryContext } from '../../../../context/DictionaryContext'
import { useDictionaries } from '../../../../hooks/useDictionaries'

export default function TypesTab() {

  const { categories } = useDictionaries()
  const { reloadCategories } = useContext(DictionaryContext)
  const [creating, setCreating] = useState(false)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleSaveRow = async (updated: Type) => {
    try {
      setLoadingId(updated._id!)
      await CategoriesAPI.edit(updated._id!, {
        slug: updated.slug,
        title: updated.title,
        description: updated.description
      })
      await reloadCategories()

      showToast.success('Saved')
    } catch (e: any) {
      showToast.error(e?.response?.data?.message || 'Save failed')
    } finally {
      setLoadingId(null)
    }
  }

  const handleCreate = async (data: Type) => {
    try {
      await CategoriesAPI.create(data)
      await reloadCategories()
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
              {languages.map((lang: Language) => (
                <th key={lang}>
                  {lang.toLocaleUpperCase()}
                </th>
              ))}
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

            {categories.map(category => (
              <CategoryRow
                key={category._id}
                category={category}
                onSave={handleSaveRow}
                isSaving={loadingId === category._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
