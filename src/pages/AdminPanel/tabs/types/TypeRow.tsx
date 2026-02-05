import { useEffect, useState } from 'react'
import { type Type } from '../../../../shared/interfaces/types'

type Props = {
  type: Type
  onSave: (type: Type) => void
  isSaving: boolean
}

export function TypeRow({ type, onSave, isSaving }: Props) {
  const [local, setLocal] = useState<Type>(type)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    setLocal(type)
    setIsDirty(false)
  }, [type])

  const updateTranslation = (
    lang: 'uk' | 'en' | 'ru',
    field: 'title' | 'description',
    value: string
  ) => {
    setLocal(prev => {
      const updated = {
        ...prev,
        translations: {
          ...prev.translations,
          [lang]: {
            ...prev.translations[lang],
            [field]: value,
          },
        },
      }

      setIsDirty(JSON.stringify(updated) !== JSON.stringify(type))
      return updated
    })
  }

  const handleCancel = () => {
    setLocal(type)
    setIsDirty(false)
  }

  const handleSave = () => {
    onSave(local)
  }

  return (
    <tr>
      <td>{type.slug}</td>

      {(['uk', 'en', 'ru'] as const).map(lang => (
        <td key={lang}>
          <input
            type="text"
            value={local.translations[lang].title}
            placeholder="Title"
            onChange={e =>
              updateTranslation(lang, 'title', e.target.value)
            }
          />
          <input
            type="text"
            value={local.translations[lang].description}
            placeholder="Description"
            onChange={e =>
              updateTranslation(
                lang,
                'description',
                e.target.value
              )
            }
          />
        </td>
      ))}

      <td>
        {isDirty && (
          <>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-medium primary-btn mt-1 w-full"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>

            <button
              type="button"
              className="btn-medium filter-btn mt-1 w-full"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          </>
        )}
      </td>
    </tr>
  )
}
