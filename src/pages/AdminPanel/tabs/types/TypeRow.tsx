import { useEffect, useState } from 'react'
import { type Type } from '../../../../shared/interfaces/types';
import { languages, type Language } from '../../../../shared/interfaces/translations';
import { TextField } from '@mui/material';

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
    lang: Language,
    field: 'title' | 'description',
    value: string
  ) => {
    setLocal(prev => {
      const updated = {
        ...prev,
      [field]: {
        ...prev[field],
        [lang]: value
      }
      }

      setIsDirty(JSON.stringify(updated) !== JSON.stringify(type))
      return updated
    })
  }

  const updateSlug = (
    value: string
  ) => {
    setLocal(prev => {
      const updated = {
        ...prev,
        slug: value,
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
      <td>
        <div className="mb-3 input-set max-w-18rem md:min-w-full col">
          <TextField
            label={`Slug`}
            fullWidth
            required
            value={local.slug}
            onChange={e =>
              updateSlug(e.target.value)
            }
          />
        </div>
      </td>

      {languages.map((lang: Language) => (
              <td key={lang}>
                <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                  <TextField
                    label={`Title`}
                    fullWidth
                    required
                    value={local.title[lang]}
                    onChange={e =>
                      updateTranslation(lang, 'title', e.target.value)
                    }
                  />
                </div>
                <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                  <TextField
                    label={`Description`}
                    fullWidth
                    value={local.description[lang]}
                    onChange={e =>
                      updateTranslation(lang, 'description', e.target.value)
                    }
                  />
                </div>
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
