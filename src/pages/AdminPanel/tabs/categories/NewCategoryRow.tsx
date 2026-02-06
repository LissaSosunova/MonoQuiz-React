import { useState } from 'react'
import { type Type } from '../../../../shared/interfaces/types'

type Props = {
    onSave: (type: Type) => void
    onCancel: () => void
}

const emptyType: Type = {
    slug: '',
    translations: {
        uk: { title: '', description: '' },
        en: { title: '', description: '' },
        ru: { title: '', description: '' },
    },
}

export function NewCategoryRow({ onSave, onCancel }: Props) {
    const [data, setData] = useState<Type>(emptyType)

    const updateTranslation = (
        lang: 'uk' | 'en' | 'ru',
        field: 'title' | 'description',
        value: string
    ) => {
        setData(prev => ({
            ...prev,
            translations: {
                ...prev.translations,
                [lang]: {
                    ...prev.translations[lang],
                    [field]: value,
                },
            },
        }))
    }

    const isValid =
        data.slug.trim().length > 0 &&
        ['uk', 'en', 'ru'].every(
            l => data.translations[l as 'uk'].title.trim().length > 0
        )

    return (
        <tr>
            <td><div className="mb-3 input-set max-w-18rem md:min-w-full col">
                <label className="form-label form-label1 required">Slug</label>
                <input
                    type="text"
                    value={data.slug}
                    onChange={e =>
                        setData({ ...data, slug: e.target.value.toLowerCase() })
                    }
                />
            </div>

            </td>

            {(['uk', 'en', 'ru'] as const).map(lang => (
                <td key={lang}>
                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                        <label className="form-label form-label1 required">Title</label>
                        <input
                            type="text"
                            value={data.translations[lang].title}
                            onChange={e =>
                                updateTranslation(lang, 'title', e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                        <label className="form-label form-label1">Description</label>
                        <input
                            type="text"
                            value={data.translations[lang].description}
                            onChange={e =>
                                updateTranslation(
                                    lang,
                                    'description',
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </td>
            ))}

            <td>
                <button
                    className="btn-main primary-btn mt-3"
                    onClick={() => onSave(data)}
                    disabled={!isValid}
                >
                    Save
                </button>

                <button type="button" onClick={onCancel} className="btn-main filter-btn mt-3">
                    Cancel
                </button>
            </td>
        </tr>
    )
}
